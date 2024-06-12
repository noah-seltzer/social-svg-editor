import { fabric } from 'fabric'
import { Button } from '@mui/material'
import { useFabric } from '@/hooks/use-fabric'
import EditorToolSelect from '@/components/editor-tool-select'
import EditorColorSelect from '@/components/editor-color-select'
import { downloadSVG } from '@/util/file'


const Editor: React.FC = () => {
    const { canvasRef, fabricCanvas } = useFabric()

    const exportSvg = () => {
        if (!fabricCanvas) return
        downloadSVG('export.svg', fabricCanvas.toSVG())
    }
    
    const shareUrl = () => {
        if (!fabricCanvas) return
        const json = fabricCanvas.toJSON()
        const encoded = encodeURIComponent(JSON.stringify(json))

        navigator.clipboard.writeText(encoded);
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24 gap-8'>

            <div className='flex flex-row items-center justify-between gap-8'>
                <div className='flex flex-col items-center gap-4'>
                    <EditorColorSelect />
                    <EditorToolSelect />
                    <Button variant='outlined' onClick={exportSvg}>Download</Button>
                    <Button variant='outlined' onClick={shareUrl}>Share</Button>
                </div>
                <div>
                    <canvas
                        className='border border-sky-500'
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
