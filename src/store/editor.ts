import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EditorTool } from "@/types/editor";
import { FabricEvent } from "../hooks/use-fabric";

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
        editorMouseDown(state, action: PayloadAction<FabricEvent>) {
            const x = action.payload.pointer.x
            const y = action.payload.pointer.y
            state.isObjectSelected = action.payload.hasTarget
            if (action.payload.hasTarget) {
                state.mouseDownPosition = undefined
                state.mouseUpPosition = undefined
            } else {
                state.mouseDownPosition = {x, y}
            }
            state.isMouseDown = true
        },
        editorMouseUp(state, action: PayloadAction<FabricEvent>) {
            const x = action.payload.pointer.x
            const y = action.payload.pointer.y
            if (state.mouseDownPosition) {
                state.mouseUpPosition =  {x, y}
            } else {
                state.mouseDownPosition = undefined
                state.mouseUpPosition = undefined
            }
            state.isMouseDown = false
            state.isObjectSelected = false

        },
        resetMousePositions(state) {
            state.mouseDownPosition = undefined
            state.mouseUpPosition = undefined
        },
        editorMouseMove(state, action: PayloadAction<FabricEvent>) {
        },
        editorObjectSelected(state, action: PayloadAction<FabricEvent>) {
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