'use client'
import { fabric } from 'fabric'
import { Button, ButtonGroup } from '@mui/material'
import { useFabric } from '../hooks/use-fabric'

export default function Home() {


    const { canvasRef, fabricCanvas, addToCanvas } = useFabric((fabricCanvas: fabric.Canvas) => {


        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 50,
            height: 50
        })

        fabricCanvas.add(rect)
        // addToCanvas(rect)

        // const rect2 = new fabric.Rect({
        //     left: 300,
        //     top: 400,
        //     fill: 'green',
        //     width: 50,
        //     height: 50,
        // })

        // addToCanvas(rect2)

        

        // scaling and rotating mouse controls don't work until there's a group select for some reason :)
        // const groupSelect = new fabric.ActiveSelection([rect, rect2])
        // fabricCanvas.setActiveObject(groupSelect)

        // group.add(rect2)
        // fabricCanvas.add(rect2)
        // fabricCanvas.setActiveObject(rect2)
        // fabricCanvas.renderAll()
    })

    const onExport = () => {
        // if (!visibleGroup) return
        // const groupSVG = visibleGroup.toSVG()
        // const SVGWithParent = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="50 50 500 500" fill="none">${groupSVG}</svg>`
        // downloadTextAsFile('export.svg', SVGWithParent)
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
