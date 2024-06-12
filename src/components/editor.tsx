import { fabric } from 'fabric'
import { AppBar, Button, CircularProgress, Drawer, Grid } from '@mui/material'
// import Grid from '@mui/material/Unstable_Grid2';
import { useFabric } from '@/hooks/use-fabric'
import EditorToolSelect from '@/components/editor-tool-select'
import EditorColorSelect from '@/components/editor-color-select'
import { downloadSVG } from '@/util/file'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { usePathname } from 'next/navigation'
import { join } from 'path'

const Editor: React.FC = () => {
    const { canvasRef, fabricCanvas, isLoaded: canvasIsLoaded } = useFabric()
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
    const pathname = usePathname()
    const exportSvg = () => {
        if (!fabricCanvas) return
        downloadSVG('export.svg', fabricCanvas.toSVG())
    }

    const shareUrl = () => {
        if (!fabricCanvas) return
        // console.log(fabricCanvas.toJSON())
        const json = fabricCanvas.toJSON()
        const encoded = JSON.stringify(json)
        const url = `${window.location.pathname}?canvas"${encoded}"`
        console.log(url)
        navigator.clipboard.writeText(url)
    }
    console.log('loaded', canvasIsLoaded)
    return (
        <main>
            <Button
                className='w-min fixed left-0 top-0 z-10 py-4 m-2'
                variant='contained'
                onClick={() => setDrawerOpen(true)}
            >
                <MenuIcon />
            </Button>
            <div>
                <Drawer
                    className='p-4 py-16'
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <div className='flex flex-col items-center gap-4 px-4 pt-16'>
                        <EditorColorSelect />
                        <EditorToolSelect />
                        <Button variant='outlined' onClick={exportSvg}>
                            Download
                        </Button>
                        <Button variant='outlined' onClick={shareUrl}>
                            Share
                        </Button>
                    </div>
                </Drawer>
                <div className='w-full h-full'>
                    <canvas
                        className='border border-sky-500'
                        ref={canvasRef}
                        width='600'
                        height='600'
                    ></canvas>
                </div>
            </div>
            {!canvasIsLoaded ?? (
                <div className='z-100 fixed left-0 top-0 bg-white w-full h-full flex justify-center items-center'>
                    <CircularProgress />
                </div>
            )}
        </main>
    )
}

export default Editor
