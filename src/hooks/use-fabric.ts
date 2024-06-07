import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { useAppDispatch, useAppSelector } from './hooks'
import { editorMouseDown, editorMouseMove, editorMouseUp, resetMousePositions } from '../store/editor'


const prepEventForDispatch = (event: fabric.IEvent<MouseEvent>): Record<string, any> => {
    return {
        ...event,
        e: undefined,
        target: undefined,
        absolutePointer: undefined,
        currentTarget: undefined,
    }
}
export const useFabric = (
    onLoaded?: (canvas: fabric.Canvas) => void
): {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
    fabricCanvas: fabric.Canvas | Falsy
    addToCanvas: (obj: fabric.Object) => void
} => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const dispatch = useAppDispatch()

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
    const [visibleGroup, setVisibleGroup] = useState<fabric.Group | null>(null)

    const mouseDownPosition = useAppSelector(state => state.editor.mouseDownPosition)
    const mouseUpPosition = useAppSelector(state => state.editor.mouseUpPosition)

    useEffect(()=> {
        if (mouseUpPosition && mouseDownPosition && fabricCanvas) {
            console.log('EXECUTING')
            const left = Math.min(mouseDownPosition.x, mouseUpPosition.x)
            const top = Math.min(mouseDownPosition.y, mouseUpPosition.y)
            const right = Math.max(mouseDownPosition.x, mouseUpPosition.x)
            const bottom = Math.max(mouseDownPosition.y, mouseUpPosition.y)

            const width = right - left
            const height = bottom - top
            const newRect = new fabric.Rect({
                fill: 'red',
                left,
                top,
                width,
                height
            })
            fabricCanvas.add(newRect)
            // fabricCanvas.renderAll()
            dispatch(resetMousePositions())
        }
    },[mouseUpPosition, mouseDownPosition])

    useEffect(() => {
        if (!canvasRef.current || fabricCanvas) return

        const canvas = new fabric.Canvas(canvasRef.current, {
            interactive: true,
            selection: true,
            centeredScaling: true,
            centeredRotation: true
        })


        const group = new fabric.Group()

        const canvasBackground = new fabric.Rect({
            left: 0,
            top: 0,
            fill: 'gray',
            width: 600,
            height: 600,
            selectable: false
        })
        canvas.add(canvasBackground)

        const background = new fabric.Rect({
            left: 50,
            top: 50,
            fill: 'white',
            width: 500,
            height: 500,
            selectable: false
        })

        canvas.add(background)
        group.add(background)
        const groupSelect = new fabric.ActiveSelection([
            background,
            canvasBackground
        ])

        canvas.setActiveObject(groupSelect)

        canvas.discardActiveObject()

        setVisibleGroup(group)
        setFabricCanvas(canvas)

        const bindings: {key: fabric.EventName, handler: (event: Record<string, any>) => void}[] = [
            {key: 'mouse:down', handler: (event) => dispatch(editorMouseDown(event))},
            {key: 'mouse:up', handler: (event) => dispatch(editorMouseUp(event))},
            {key: 'mouse:move', handler: (event) => dispatch(editorMouseMove(event))}
        ]

        bindings.forEach(binding => {
            canvas.on(binding.key, (event) => binding.handler(prepEventForDispatch(event)))
        })

        if (onLoaded) {
            onLoaded(canvas)
        }
    }, [canvasRef.current])


    const addToCanvas = (obj: fabric.Object) => {
        fabricCanvas?.add(obj)
        visibleGroup?.add(obj)
    }

    return { canvasRef, fabricCanvas: fabricCanvas, addToCanvas }
}
