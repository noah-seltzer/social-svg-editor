import { useEffect, useRef, useState } from "react"
import { fabric } from 'fabric'

export const useFabric = (
    onLoaded?: (canvas: fabric.Canvas) => void
) : {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
    // fabricCanvas: fabric.Canvas | Falsy
} => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        console.log('hook', canvasRef)
        if (!canvasRef.current) return

        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            interactive: true,
            selection: true,
            centeredScaling: true,
            centeredRotation: true
        })
        // setFabricCanvas(fabricCanvas)
        if (onLoaded) {
            onLoaded(fabricCanvas)
        }
    }, [canvasRef.current])
    
    // const fabricCanvas = new fabric.Canvas(canvasRef.current, {
    //     interactive: true,
    //     selection: true,
    //     centeredScaling: true,
    //     centeredRotation: true
    // })


    
    return { canvasRef }
}