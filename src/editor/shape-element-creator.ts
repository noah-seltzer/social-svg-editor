import { EditorTool } from '../types/editor'
import { fabric } from 'fabric'

export class ElementFactory {
    static produceShape({
        toolType,
        left,
        top,
        width,
        height,
        fill
    }: {
        toolType: EditorTool
        left: number
        top: number
        width: number
        height: number
        fill: string
    }) {
        if (toolType === EditorTool.Rectangle) {
            return new fabric.Rect({
                fill,
                left,
                top,
                width,
                height
            })
        } else if (toolType === EditorTool.Triangle) {
            return new fabric.Triangle({
                fill,
                left,
                top,
                width,
                height
            })
        } else {
            return new fabric.Circle({
                fill,
                radius: Math.max(width / 2, height / 2),
                left,
                top
            })
        }
    }
}
