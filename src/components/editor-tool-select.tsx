import { ButtonGroup, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { EditorTool } from '@/types/editor'
import { toolSelected } from '@/store/editor'

const EditorToolSelect: React.FC = () => {
    const dispatch = useAppDispatch()

    const selectedTool = useAppSelector((state) => state.editor.selectedTool)

    const tools = [
        {
            label: 'Freedraw',
            slug: EditorTool.FreeDraw,
        },
        {
            label: 'Select',
            slug: EditorTool.Select
        },
        {
            label: 'Rectangle',
            slug: EditorTool.Rectangle
        },
        {
            label: 'Triangle',
            slug: EditorTool.Triangle
        },
        {
            label: 'Circle',
            slug: EditorTool.Circle
        }
    ]
    return (
        <ButtonGroup orientation='vertical' aria-label='Vertical button group'>
            {tools.map((tool) => {
                return (
                    <Button
                        key={tool.slug}
                        variant={
                            selectedTool === tool.slug
                                ? 'contained'
                                : 'outlined'
                        }
                        onClick={() => dispatch(toolSelected(tool.slug))}
                    >
                        {tool.label}
                    </Button>
                )
            })}
        </ButtonGroup>
    )
}

export default EditorToolSelect
