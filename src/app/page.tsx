'use client'
import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { Button, ButtonGroup } from '@mui/material'
import { downloadTextAsFile } from '../editor/download-file'
import { getRandomNumber } from '../util/random'
import { useFabric } from '../hooks/use-fabric'

export default function Home() {
    // const canvasRef = useRef<HTMLCanvasElement>(null)

    // const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | Falsy>(
    //     null
    // )
    // const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | Falsy>(null)
    const [visibleGroup, setVisibleGroup] = useState<fabric.Group | Falsy>(null)

    const { canvasRef } = useFabric((fabricCanvas: fabric.Canvas) => {
        const group = new fabric.Group()
        // fabricCanvas.add(visibleGroup)
        const canvasBackground = new fabric.Rect({
            left: 0,
            top: 0,
            fill: 'gray',
            width: 600,
            height: 600,
            selectable: false
        })
        fabricCanvas.add(canvasBackground)

        const background = new fabric.Rect({
            left: 50,
            top: 50,
            fill: 'white',
            width: 500,
            height: 500,
            selectable: false
        })
        // fabricCanvas.add(background)

        fabricCanvas.add(background)
        group.add(background)
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 50,
            height: 50
        })

        group.add(rect)
        fabricCanvas.add(rect)
        const rect2 = new fabric.Rect({
            left: 300,
            top: 400,
            fill: 'green',
            width: 50,
            height: 50,
        })

        group.add(rect2)
        fabricCanvas.add(rect2)
        // fabricCanvas.setActiveObject(rect2)
        // setVisibleGroup(group)
    })
    // useEffect(() => {
    //     // console.log('use effect start')
    //     // if (!fabricCanvas) return
    //     // console.log('hi')
    //     // const fabricCanvas = new fabric.Canvas(canvasRef.current, {
    //     //     interactive: true,
    //     //     selection: true,
    //     //     centeredScaling: true,
    //     //     centeredRotation: true
    //     // })

    //     // setFabricCanvas(fabricCanvas)
        
    //     const group = new fabric.Group()
    //     // fabricCanvas.add(visibleGroup)
    //     const canvasBackground = new fabric.Rect({
    //         left: 0,
    //         top: 0,
    //         fill: 'gray',
    //         width: 600,
    //         height: 600,
    //         selectable: false
    //     })
    //     fabricCanvas.add(canvasBackground)

    //     const background = new fabric.Rect({
    //         left: 50,
    //         top: 50,
    //         fill: 'white',
    //         width: 500,
    //         height: 500,
    //         selectable: false
    //     })
    //     // fabricCanvas.add(background)

    //     fabricCanvas.add(background)
    //     group.add(background)
    //     const rect = new fabric.Rect({
    //         left: 100,
    //         top: 100,
    //         fill: 'red',
    //         width: 50,
    //         height: 50
    //     })

    //     group.add(rect)
    //     fabricCanvas.add(rect)
    //     const rect2 = new fabric.Rect({
    //         left: 300,
    //         top: 400,
    //         fill: 'green',
    //         width: 50,
    //         height: 50,
    //     })

    //     group.add(rect2)
    //     fabricCanvas.add(rect2)
    //     fabricCanvas.setActiveObject(rect2)
    //     setVisibleGroup(group)
    //     // fabricCanvas.renderAll()
    // }, [fabricCanvas])

    const onExport = () => {
        if (!visibleGroup) return
        const groupSVG = visibleGroup.toSVG()
        const SVGWithParent = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="50 50 500 500" fill="none">${groupSVG}</svg>`
        downloadTextAsFile('export.svg', SVGWithParent)
    }

    const createRect = () => {
        // if (!fabricCanvas || !visibleGroup) return
        // const rect = new fabric.Rect({
        //     left: 300 + getRandomNumber(0, 100),
        //     top: 400 + getRandomNumber(0, 100),
        //     fill: 'green',
        //     width: 20,
        //     height: 20,
        // })
        // visibleGroup.add(rect)
        // fabricCanvas.add(rect)
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <Button variant='outlined' onClick={onExport}>
                Export
            </Button>

            <div className='flex flex-row'>
                <div>
                    <ButtonGroup
                        orientation='vertical'
                        aria-label='Vertical button group'
                    >
                        <Button variant='outlined' onClick={createRect}>
                            Rectangle
                        </Button>
                    </ButtonGroup>
                </div>
                 <canvas ref={canvasRef} width='600' height='600'></canvas>
            </div>
        </main>
    )
}
