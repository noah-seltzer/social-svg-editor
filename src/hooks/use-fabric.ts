import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { useAppDispatch, useAppSelector } from './hooks'
import { editorMouseDown, editorMouseMove, editorMouseUp, resetMousePositions } from '../store/editor'
import { EditorTool } from '../types/editor'


const prepEventForDispatch = (event: fabric.IEvent<MouseEvent>): Record<string, any> => {
    return {
        ...event,
        e: undefined,
        target: undefined,
        absolutePointer: undefined,
        currentTarget: undefined,
        transform: undefined
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
    const selectedTool = useAppSelector(state => state.editor.selectedTool)

    useEffect(() => {
        if (!fabricCanvas) return
        if (selectedTool === EditorTool.Select) {
            fabricCanvas.selection = true
        } else {
            fabricCanvas.selection = false
        }
    }, [selectedTool])
    useEffect(()=> {
        if (!fabricCanvas) return
        if (!(mouseUpPosition && mouseDownPosition)) return
        
        const left = Math.floor(Math.min(mouseDownPosition.x, mouseUpPosition.x))
        const top = Math.floor(Math.min(mouseDownPosition.y, mouseUpPosition.y))
        const right = Math.floor(Math.max(mouseDownPosition.x, mouseUpPosition.x))
        const bottom = Math.floor(Math.max(mouseDownPosition.y, mouseUpPosition.y))

        const width = right - left
        const height = bottom - top
        if (selectedTool === EditorTool.Rectangle) {
            console.log('rect')
            const rect = new fabric.Rect({
                fill: 'red',
                left,
                top,
                width,
                height,

            })
            fabricCanvas.add(rect)
            fabricCanvas.bringToFront(rect)
            rect.setCoords()
            // fabricCanvas.renderAll()
            fabricCanvas.setActiveObject(rect)
            dispatch(resetMousePositions())
        } else if (selectedTool === EditorTool.Triangle) {
            const tri = new fabric.Triangle({
                fill: 'green',
                left,
                top,
                width,
                height
            })
            fabricCanvas.add(tri)
            dispatch(resetMousePositions())
        } else if (selectedTool === EditorTool.Circle) {
            const circ = new fabric.Circle({
                fill: 'blue',
                radius: width / 2,
                left,
                top
            })
            fabricCanvas.add(circ)
            dispatch(resetMousePositions())
        }
        
    },[mouseUpPosition, mouseDownPosition])

    useEffect(() => {
        if (!canvasRef.current || fabricCanvas) return

        const canvas = new fabric.Canvas(canvasRef.current, {
            interactive: true,
            selection: true,
            centeredScaling: true,
            centeredRotation: true,
            preserveObjectStacking: true
        })

        const group = new fabric.Group()

        // const canvasBackground = new fabric.Rect({
        //     left: 0,
        //     top: 0,
        //     fill: 'gray',
        //     width: 600,
        //     height: 600,
        //     selectable: false
        // })
        // canvas.add(canvasBackground)
        // canvasBackground.setCoords()
        // const background = new fabric.Rect({
        //     left: 50,
        //     top: 50,
        //     fill: 'white',
        //     width: 500,
        //     height: 500,
        //     selectable: false
        // })
        // background.setCoords()
        // canvas.add(background)
        // group.add(background)
        // const groupSelect = new fabric.ActiveSelection([
        //     background,
        //     canvasBackground
        // ])

        // canvas.setActiveObject(groupSelect)

        // canvas.discardActiveObject()

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
