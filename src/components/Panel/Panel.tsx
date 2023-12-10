import React from 'react'
import { Add } from '@mui/icons-material';
import { TextField, Paper, Button } from '@mui/material';
import type { Todo } from '../../App';

const DEFAULT_TODO = { name: '', description: '' };

interface PanelProps {
    onAddTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void
}

export const Panel: React.FC<PanelProps> = ({ onAddTodo }) => {

    const [todo, setTodo] = React.useState(DEFAULT_TODO);

    const onClick = () => {
        onAddTodo(todo);
        setTodo(DEFAULT_TODO);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setTodo({ ...todo, [name]: value });
    }

    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                padding: '25px 30px',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignContent: 'center',
                gap: 2
            }}>
            <TextField value={todo.name} onChange={onChange} name='name' label='name' fullWidth />
            <TextField value={todo.description} onChange={onChange} name='description' label='description' fullWidth />
            <Button startIcon={<Add />} variant="outlined" onClick={onClick}>ADD</Button>
        </Paper>
    )
}
