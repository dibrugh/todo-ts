import React from 'react'
import { Box } from '@mui/material';

import { ToDoItem } from './ToDoItem/ToDoItem';
import type { Todo } from '../../App';


interface TodoListProps {
    todoList: Todo[];
    onDeleteTodo: (id: Todo['id']) => void;
    onCheckTodo: (id: Todo['id']) => void;
}

export const ToDoList: React.FC<TodoListProps> = ({ todoList, onDeleteTodo, onCheckTodo }) => (
    <Box>
        {todoList.map(todo => (<ToDoItem todo={todo} onDeleteTodo={onDeleteTodo} onCheckTodo={onCheckTodo}/>))}
    </Box>
)
