import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EditorTool } from "@/types/editor";
import { fabric } from 'fabric'

interface EditorState {
    selectedTool: EditorTool,
    mouseDownPosition: Point | undefined,
    mouseUpPosition: Point | undefined
}
interface Point {
    x: number, y: number
}
export interface MouseEvent {
    pointer: Point
    [key: string]: any
}

const createInitialState = (): EditorState => ({
    selectedTool: EditorTool.Rectangle,
    mouseDownPosition: undefined,
    mouseUpPosition: undefined
})

const editorStore = createSlice({
    name: 'editor',
    initialState: createInitialState(),
    reducers: {
        toolSelected(state, action: PayloadAction<EditorTool>) {
            state.selectedTool = action.payload
        },
        editorMouseDown(state, action: PayloadAction<Record<string, any>>) {
            const x = action.payload.pointer.x
            const y = action.payload.pointer.y
            state.mouseDownPosition = {x, y}
        },
        editorMouseUp(state, action: PayloadAction<Record<string, any>>) {
            const x = action.payload.pointer.x
            const y = action.payload.pointer.y
            state.mouseUpPosition =  {x, y}
        },
        resetMousePositions(state) {
            state.mouseDownPosition = undefined
            state.mouseUpPosition = undefined
        },
        editorMouseMove(state, action: PayloadAction<Record<string, any>>) {
            // console.log('mouse move', action)
        }
    },

})

export const {
    toolSelected,
    editorMouseDown,
    editorMouseMove,
    editorMouseUp,
    resetMousePositions
} = editorStore.actions


export default editorStore.reducer