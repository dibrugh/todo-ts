import React from 'react'
import { Paper, TextField, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import type { Todo } from '../../../App';

interface EditToDoItemProps {
    todo: Todo;
    onChangeTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
}

export const EditToDoItem: React.FC<EditToDoItemProps> = ({ todo, onChangeTodo }) => {

    const [editTodo, setEditTodo] = React.useState({ name: todo.name, description: todo.description });

    const onClick = () => {
        onChangeTodo(editTodo);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setEditTodo({ ...todo, [name]: value });
    }

    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                marginTop: '15px',
                padding: '20px 28px',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignContent: 'center',
                gap: 2,
            }}>
            <TextField value={editTodo.name} onChange={onChange} name='name' label='name' fullWidth />
            <TextField value={editTodo.description} onChange={onChange} name='description' label='description' fullWidth />
            <Button startIcon={<EditIcon />} variant="outlined" onClick={onClick}>EDIT</Button>
        </Paper>
    )
}

