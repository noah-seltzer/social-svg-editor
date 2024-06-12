import { Button, Drawer } from '@mui/material'
import { useFabric } from '@/hooks/use-fabric'
import EditorToolSelect from '@/components/editor-tool-select'
import EditorColorSelect from '@/components/editor-color-select'
import { downloadSVG } from '@/util/file'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

const Editor: React.FC = () => {
    const {
        canvasRef,
        canvasParentRef,
        fabricCanvas,
        isLoaded: canvasIsLoaded
    } = useFabric()

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

    const exportSvg = () => {
        if (!fabricCanvas) return
        downloadSVG('export.svg', fabricCanvas.toSVG())
    }


    return (
        <main className='h-screen bg-gray-200'>
            <Drawer
                className='p-4 py-16'
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <div className='flex flex-col items-center gap-4 px-4 pt-16'>
                    <EditorToolSelect />
                    <Button variant='outlined' onClick={exportSvg}>
                        Download
                    </Button>
                </div>
            </Drawer>
            <div className='flex flex-row gap-2'>
                <Button
                    className='w-min py-4 m-2'
                    variant='contained'
                    onClick={() => setDrawerOpen(true)}
                >
                    <MenuIcon />
                </Button>
                <EditorColorSelect />
            </div>
            <div className='m-2 h-5/6'>
                <div ref={canvasParentRef} className='w-full h-full'>
                    <canvas
                        className='border border-sky-500 rounded-sm'
                        ref={canvasRef}
                        width='600'
                        height='600'
                    ></canvas>
                </div>
            </div>
        </main>
    )
}

export default Editor
