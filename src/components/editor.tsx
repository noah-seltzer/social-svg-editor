import { fabric } from 'fabric'
import { Button, ButtonGroup } from '@mui/material'
import { useFabric } from '../hooks/use-fabric'
import EditorToolSelect from './editor-tool-select'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { MouseEventHandler } from 'react'

const Editor: React.FC = () => {
    const toolSelected = useAppSelector((state) => state.editor.selectedTool)
    const dispatch = useAppDispatch()
    const { canvasRef, fabricCanvas, addToCanvas } = useFabric(
        (fabricCanvas: fabric.Canvas) => {
            const rect = new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'red',
                width: 50,
                height: 50
            })

            fabricCanvas.add(rect)
        },

    )


    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <Button variant='outlined'>
                Export
            </Button>

            <div className='flex flex-row'>
                <div>
                    <EditorToolSelect />
                </div>
                <div>
                    <canvas ref={canvasRef} width='600' height='600'></canvas>
                </div>
            </div>
        </main>
    )
}

export default Editor
