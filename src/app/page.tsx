'use client'
import { useEffect, useRef, useState } from "react";

import { fabric } from 'fabric'
import { Button } from '@mui/material'
// import {SnappyRect} from '../editor/editor-element'



export default function Home() {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | Falsy>(null)
  const [visibleGroup, setVisibleGroup] = useState<fabric.Group | Falsy>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const fabricCanvas = new fabric.Canvas(canvasRef.current)

    setFabricCanvas(fabricCanvas)
    const visibleGroup = new fabric.Group()
    const canvasBackground = new fabric.Rect({
      left:0,
      top:0,
      fill: 'gray',
      width: 600,
      height: 600,
      selectable: false
    })
    fabricCanvas.add(canvasBackground)
    canvasBackground.initialize
    const background = new fabric.Rect({
      left:50,
      top:50,
      fill: 'white',
      width: 500,
      height: 500,
      selectable: false
    })
    fabricCanvas.add(background)

    visibleGroup.add(background)

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    fabricCanvas.add(rect)
    visibleGroup.add(rect)
    const rect2 = new fabric.Rect({
      left: 300,
      top: 400,
      fill: 'green',
      width: 20,
      height: 20
    });

    fabricCanvas.add(rect2)
    visibleGroup.add(rect2)
    setVisibleGroup(visibleGroup)
    
    
  }, [canvasRef.current])
  
  const onExport = () => {
    if (!visibleGroup) return
    const svg = visibleGroup.toSVG()
    console.log(`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="50 50 500 500" fill="none">${svg}</svg>`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant='outlined' onClick={onExport}>Export</Button>
      <canvas ref={canvasRef} width='600' height='600' ></canvas>

    </main>
  );
}
