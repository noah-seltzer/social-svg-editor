import { useAppDispatch } from "@/hooks/hooks"
import { colorChanged } from "@/store/editor"

const EditorColorSelect: React.FC = () => {
    
    const dispatch = useAppDispatch()
    
    return <input type='color' onChange={(event) => dispatch(colorChanged(event.target.value))} />
}

export default EditorColorSelect