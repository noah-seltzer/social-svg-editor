import { fabric } from 'fabric'
import { Button, ButtonGroup } from '@mui/material'
import { useFabric } from '../hooks/use-fabric'
import EditorToolSelect from './editor-tool-select'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import React, { MouseEventHandler, useState, memo } from 'react'
import EditorColorSelect from './editor-color-select'

const Editor: React.FC = () => {
    const { canvasRef, addToCanvas } = useFabric(
        (fabricCanvas: fabric.Canvas) => {
            const rect = new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'red',
                width: 50,
                height: 50
            })

            const rect2 = new fabric.Rect({
                left: 250,
                top: 250,
                fill: 'red',
                width: 50,
                height: 50
            })

            fabricCanvas.add(rect)
            fabricCanvas.add(rect2)
            rect.setCoords()
            rect2.setCoords()
            fabricCanvas.setActiveObject(rect)
        }
    )
    
    console.log('rendering canvas')
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24 gap-8'>
            <Button variant='outlined'>Export</Button>

            <div className='flex flex-row items-center justify-between gap-8'>
                <div className='flex flex-col items-center gap-4'>
                    <EditorColorSelect />
                    <EditorToolSelect />
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
