import { useAppDispatch } from "@/hooks/hooks"
import { colorChanged } from "@/store/editor"

const EditorColorSelect: React.FC = () => {
    
    const dispatch = useAppDispatch()
    
    return <div className="flex flex-row items-center gap-2">
        Color: <input type='color' onChange={(event) => dispatch(colorChanged(event.target.value))} />

    </div> 
}

export default EditorColorSelect