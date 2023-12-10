import React from 'react'
import { Paper, Box, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { Todo } from '../../../App';

interface TodoItemProps {
    todo: Todo;
    onDeleteTodo: (id: Todo['id']) => void;
    onCheckTodo: (id: Todo['id']) => void;
}

export const ToDoItem: React.FC<TodoItemProps> = ({ todo, onDeleteTodo, onCheckTodo }) => (
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
            opacity: todo.checked ? 0.5 : 1,
        }}>
        <Box textAlign='left'>
            <Typography
                onClick={() => onCheckTodo(todo.id)}
                sx={{ cursor: 'pointer', textDecorationLine: todo.checked ? 'line-through' : 'none' }}
                variant="h5"
                gutterBottom
            >
                {todo.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {todo.description}
            </Typography>
        </Box>
        <Box display='flex'>
            <IconButton aria-label="delete" color="error" onClick={() => onDeleteTodo(todo.id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    </Paper>
)

