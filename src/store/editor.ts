import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EditorTool } from "@/types/editor";
import { fabric } from 'fabric'

interface EditorState {
    selectedTool: EditorTool,
    mouseDownPosition: Point | undefined,
    mouseUpPosition: Point | undefined,
    isMouseDown: boolean
}
interface Point {
    x: number, y: number
}
export interface MouseEvent {
    pointer: Point
    [key: string]: any
}

const createInitialState = (): EditorState => ({
    selectedTool: EditorTool.Select,
    mouseDownPosition: undefined,
    mouseUpPosition: undefined,
    isMouseDown: false,
})

const editorStore = createSlice({
    name: 'editor',
    initialState: createInitialState(),
    reducers: {
        toolSelected(state, action: PayloadAction<EditorTool>) {
            state.selectedTool = action.payload
            state.mouseDownPosition = undefined
            state.mouseUpPosition = undefined
        },
        editorMouseDown(state, action: PayloadAction<Record<string, any>>) {
            console.log('mouse down')
            const x = action.payload.pointer.x
            const y = action.payload.pointer.y
            state.mouseDownPosition = {x, y}
            state.isMouseDown = true
        },
        editorMouseUp(state, action: PayloadAction<Record<string, any>>) {
            console.log('mouse up')
            const x = action.payload.pointer.x
            const y = action.payload.pointer.y
            state.mouseUpPosition =  {x, y}
            state.isMouseDown = false
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