import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { useAppDispatch, useAppSelector } from './hooks'
import { editorMouseDown, editorMouseMove, editorMouseUp, editorObjectSelected, resetMousePositions, toolSelected } from '../store/editor'
import { EditorTool, SHAPE_TOOLS } from '../types/editor'
import { ElementFactory } from '../editor/shape-element-creator'
import Editor from '../components/editor'
import { useSearchParams } from 'next/navigation'
import { useWindowSize } from './use-window-size'


export interface FabricEvent {
    pointer: {
        x: number,
        y: number
    },
    hasTarget: boolean
}

const prepEventForDispatch = (event: fabric.IEvent<MouseEvent>, name: string): FabricEvent => {
    return {
        pointer: event.pointer || {x: 0, y: 0},
        hasTarget: !!event.target

    }
}
export const useFabric = (
    onLoaded?: (canvas: fabric.Canvas) => void
): {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
    fabricCanvas: fabric.Canvas | Falsy
    addToCanvas: (obj: fabric.Object) => void,
    isLoaded: boolean
} => {

    const {width: windowWidth, height: windowHeight } = useWindowSize()
    const searchParams = useSearchParams()
 
    const canvasInitialize = searchParams.get('canvas')


    const canvasRef = useRef<HTMLCanvasElement>(null)
    const dispatch = useAppDispatch()

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
    const [visibleGroup, setVisibleGroup] = useState<fabric.Group | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)

    const mouseDownPosition = useAppSelector(state => state.editor.mouseDownPosition)
    const mouseUpPosition = useAppSelector(state => state.editor.mouseUpPosition)
    const isObjectSelected = useAppSelector(state => state.editor.isObjectSelected)
    const selectedTool = useAppSelector(state => state.editor.selectedTool)
    const selectedColor = useAppSelector(state => state.editor.color)

    const updateCanvasOnResize = () => {
        if (!canvasRef.current || !fabricCanvas) return
        console.log(windowHeight, windowWidth)
        canvasRef.current.width = windowWidth
        canvasRef.current.height = windowHeight
        fabricCanvas.setWidth(windowWidth)
        fabricCanvas.setHeight(windowHeight)
    }

    useEffect(() => {
        updateCanvasOnResize()
    }, [windowWidth, windowHeight])

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
        console.log('is object selected', isObjectSelected)
        if (isObjectSelected) {
            dispatch(resetMousePositions())
            return
        }

        if (!SHAPE_TOOLS.includes(selectedTool)) return

        const left = Math.floor(Math.min(mouseDownPosition.x, mouseUpPosition.x))
        const top = Math.floor(Math.min(mouseDownPosition.y, mouseUpPosition.y))
        const right = Math.floor(Math.max(mouseDownPosition.x, mouseUpPosition.x))
        const bottom = Math.floor(Math.max(mouseDownPosition.y, mouseUpPosition.y))

        const width = right - left
        const height = bottom - top

        if (width < 2 || height < 2) {
            dispatch(resetMousePositions())
            return
        }

        const shape = ElementFactory.produceShape({
            fill: selectedColor,
            left,
            top,
            width,
            height,
            toolType: selectedTool
        })

        fabricCanvas.add(shape)
        dispatch(resetMousePositions())

        
    },[mouseUpPosition, mouseDownPosition])

    useEffect(() => {
        if (!fabricCanvas) return
        fabricCanvas.isDrawingMode = selectedTool === EditorTool.FreeDraw
        fabricCanvas.selection = selectedTool === EditorTool.Select
    }, [selectedTool])

    useEffect(() => {
        if (!canvasRef.current || fabricCanvas) return
        console.log('init')
        
        // init
        
        // const parent = canvasRef.current.parentElement

        updateCanvasOnResize()
        if (parent) {
            // canvasRef.current.addEventListener()
        }
        
        
        const canvas = new fabric.Canvas(canvasRef.current, {
            interactive: true,
            selection: false,
            centeredScaling: true,
            centeredRotation: true,
            preserveObjectStacking: true,
            isDrawingMode: true,
            backgroundColor: '#F8FAFC'
        })

        const group = new fabric.Group()

        setVisibleGroup(group)
        setFabricCanvas(canvas)

        // bind events
        const bindings: {key: fabric.EventName, handler: (event: FabricEvent) => void}[] = [
            {key: 'object:selected', handler: (event) => dispatch(editorObjectSelected(event))},
            {key: 'object:moving', handler: (event) => dispatch(editorObjectSelected(event))},
            {key: 'group:selected', handler: (event) => dispatch(editorObjectSelected(event))},
            {key: 'mouse:down', handler: (event) => dispatch(editorMouseDown(event))},
            {key: 'mouse:up', handler: (event) => dispatch(editorMouseUp(event))},
            // {key: 'mouse:move', handler: (event) => dispatch(editorMouseMove(event))},
        ]

        bindings.forEach(binding => {
            canvas.on(binding.key, (event) => binding.handler(prepEventForDispatch(event, binding.key)))
        })

        // add sample objects
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
    
        canvas.add(rect)
        canvas.add(rect2)
        rect.setCoords()
        rect2.setCoords()
        canvas.setActiveObject(rect)
        
        if (onLoaded) {
            onLoaded(canvas)
        }

        setLoaded(true)

        console.log('canvas initialized')
        
    }, [])


    const addToCanvas = (obj: fabric.Object) => {
        fabricCanvas?.add(obj)
        visibleGroup?.add(obj)
    }

    return { canvasRef, fabricCanvas: fabricCanvas, addToCanvas, isLoaded: loaded }
}
