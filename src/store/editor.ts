import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EditorTool } from "@/types/editor";

interface EditorState {
    selectedTool: EditorTool,
    mouseDownPosition: Point | undefined,
    mouseUpPosition: Point | undefined,
    isMouseDown: boolean,
    isObjectSelected: boolean,
    color: string
}
interface Point {
    x: number, y: number
}
export interface MouseEvent {
    pointer: Point
    [key: string]: any
}

const createInitialState = (): EditorState => ({
    selectedTool: EditorTool.FreeDraw,
    mouseDownPosition: undefined,
    mouseUpPosition: undefined,
    isMouseDown: false,
    isObjectSelected: false,
    color: '#ff0000'
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
            const x = action.payload.pointer.x
            const y = action.payload.pointer.y
            state.mouseDownPosition = {x, y}
            state.isMouseDown = true
        },
        editorMouseUp(state, action: PayloadAction<Record<string, any>>) {
            const x = action.payload.pointer.x
            const y = action.payload.pointer.y
            state.mouseUpPosition =  {x, y}
            state.isMouseDown = false
            state.isObjectSelected = false

        },
        resetMousePositions(state) {
            state.mouseDownPosition = undefined
            state.mouseUpPosition = undefined
        },
        editorMouseMove(state, action: PayloadAction<Record<string, any>>) {
            // console.log('mouse move', action)
        },
        editorObjectSelected(state, action: PayloadAction<Record<string, any>>) {
            state.isObjectSelected = true
        },
        colorChanged(state, action: PayloadAction<string>) {
            state.color = action.payload
        }
    },

})

export const {
    toolSelected,
    editorMouseDown,
    editorMouseMove,
    editorMouseUp,
    resetMousePositions,
    editorObjectSelected,
    colorChanged
} = editorStore.actions


export default editorStore.reducer