'use client'

import Editor from '@/components/editor'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function Home() {
    return (
        <Provider store={store}>
            <Editor />
        </Provider>
    )
}
