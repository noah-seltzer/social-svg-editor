import { ButtonGroup, Button } from '@mui/material'

const EditorToolSelect: React.FC = () => {
    const dispatch = useAppDi()
    const onToolSelect = () => {

    }
    return (
        <ButtonGroup orientation='vertical' aria-label='Vertical button group'>
            <Button variant='outlined' onClick={onToolSelect}>
                Rectangle
            </Button>
        </ButtonGroup>
    )
}
