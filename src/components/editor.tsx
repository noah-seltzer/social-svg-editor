import { AppBar, Button, CircularProgress, Drawer, Grid } from '@mui/material'
import { useFabric } from '@/hooks/use-fabric'
import EditorToolSelect from '@/components/editor-tool-select'
import EditorColorSelect from '@/components/editor-color-select'
import { downloadSVG } from '@/util/file'
import { Suspense, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

const Editor: React.FC = () => {
    const { canvasRef, canvasParentRef, fabricCanvas, isLoaded: canvasIsLoaded } = useFabric()

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

    const exportSvg = () => {
        if (!fabricCanvas) return
        downloadSVG('export.svg', fabricCanvas.toSVG())
    }

    const shareUrl = () => {
        if (!fabricCanvas) return
        const json = fabricCanvas.toJSON()
        const encoded = JSON.stringify(json)
        const url = `${window.location.origin}?canvas"${encoded}"`
        navigator.clipboard.writeText(url)
    }

    const SpinnerLoaderOverlay = <div className='z-100 left-0 top-0 bg-white h-screen w-screen'>
    <div className='w-full h-full flex items-center justify-center'>
        <CircularProgress />
    </div>
</div>
    return (
        <main className='h-full'>
            <div className='h-full'>
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
                <Button
                    className='w-min py-4 m-2'
                    variant='contained'
                    onClick={() => setDrawerOpen(true)}
                    >
                    <MenuIcon />
                </Button>
                <div className='mx-2'>
                    <div ref={canvasParentRef} className='w-full h-full'>
                        <canvas
                            className='border border-sky-500'
                            ref={canvasRef}
                            width='600'
                            height='600'
                            ></canvas>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Editor
