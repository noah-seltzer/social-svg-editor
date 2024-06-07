import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EditorTool } from "@/types/editor";

interface EditorState {
    currentTool: EditorTool
}

const createInitialState = (): EditorState => ({
    currentTool: EditorTool.Rectangle
})

const editorStore = createSlice({
    name: 'editor',
    initialState: createInitialState(),
    reducers: {
        toolSelected(state, action: PayloadAction<EditorTool>) {
            state.currentTool = action.payload
        }
    }
})