import { useEffect, useState } from 'react'

export type WindowDimensions = {
    width: number
    height: number
}

export const useWindowSize = () => {
    const [size, setSize] = useState<WindowDimensions>({ width: 0, height: 0 })
    useEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener('resize', updateSize)
        updateSize()

        return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
}
