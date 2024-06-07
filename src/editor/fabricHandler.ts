import { fabric } from 'fabric'
import { EditorTool } from '../types/editor'
import { Console } from 'console'

export class FabricHandler {
  private _canvas: fabric.Canvas


  private handlers: {[key: string]: (event:fabric.IEvent<MouseEvent>) => void} = {
    "mouse:up": () => console.log('handler', this.selectedtool)
  }

  private selectedtool: EditorTool = EditorTool.Rectangle
    constructor(canvasElement: HTMLCanvasElement) {
        this._canvas = new fabric.Canvas(canvasElement, {
            interactive: true,
            selection: true,
            centeredScaling: true,
            centeredRotation: true
        })

        this._canvas.on('mouse:up', (event) => this.emit('mouse:up', event))
    }

    setSelectedTool(tool: EditorTool) {
        this.selectedtool = tool
        console.log('selected tool', this.selectedtool)
    }

    on(key: string, handler: () => void) {
        this.handlers[key] = handler
    }

    getCanvas() {
        return this._canvas
    }

    emit(key: string, event:fabric.IEvent<MouseEvent>) {
        const handler = this.handlers[key]
        if (handler) handler(event)
    }







}