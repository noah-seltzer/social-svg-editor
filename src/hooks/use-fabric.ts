import { useEffect, useRef, useState } from "react"
import { fabric } from 'fabric'

export const useFabric = (
    onLoaded?: (canvas: fabric.Canvas) => void
) : {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
    fabricCanvas: fabric.Canvas | Falsy
    addToCanvas: (obj: fabric.Object) => void
} => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [fCanvas, setFabric] = useState<fabric.Canvas | null>(null)
    const [visibleGroup, setVisibleGroup] = useState<fabric.Group | null>(null)

    useEffect(() => {
        console.log('hook useeffect')
        if (!canvasRef.current || fCanvas) return
        console.log('executing')

        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            interactive: true,
            selection: true,
            centeredScaling: true,
            centeredRotation: true
        })
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

        fabricCanvas.add(background)
        group.add(background)
        const groupSelect = new fabric.ActiveSelection([background, canvasBackground])

        fabricCanvas.setActiveObject(groupSelect)

        fabricCanvas.discardActiveObject()

        setVisibleGroup(group)
        setFabric(fabricCanvas)
        if (onLoaded) {
            onLoaded(fabricCanvas)
        }        
    }, [canvasRef.current])


    const addToCanvas = (obj: fabric.Object) => {
        console.log('hi', fCanvas, visibleGroup)
        fCanvas?.add(obj)
        visibleGroup?.add(obj)
    }
    
    return { canvasRef, fabricCanvas: fCanvas, addToCanvas, visibleGroup }
}