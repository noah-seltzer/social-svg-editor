'use client'

import Editor from '@/components/editor'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { createContext } from 'vm';

type FabContext = [
    // The canvas
    fabric.Canvas | null,
    // The setter for the canvas
    (c: fabric.Canvas) => void
  ];
  
  // This is the context that components in need of canvas-access will use:
  export const FabricContext = createContext([null, () => {}]);

export default function Home() {
    return (
        <Provider store={store}>
            <Editor />
        </Provider>
    )
}
