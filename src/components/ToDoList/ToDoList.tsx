import React from 'react'
import { Box } from '@mui/material';

import { ToDoItem } from './ToDoItem/ToDoItem';
import type { Todo } from '../../App';
import { EditToDoItem } from './EditToDoItem/EditToDoItem';


interface TodoListProps {
    editTodoId: Todo['id'] | null;
    todoList: Todo[];
    onDeleteTodo: (id: Todo['id']) => void;
    onCheckTodo: (id: Todo['id']) => void;
    onEdit: (id: Todo['id']) => void;
    onChangeTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
}

export const ToDoList: React.FC<TodoListProps> = ({ todoList, onDeleteTodo, onCheckTodo, onEdit, editTodoId, onChangeTodo }) => (
    <Box>
        {todoList.map(todo => {
            
            if (todo.id === editTodoId) return (
            <EditToDoItem key={todo.id} todo={todo} onChangeTodo={onChangeTodo} />
            )

            return (
            <ToDoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} onCheckTodo={onCheckTodo} onEdit={onEdit} />
            )
            })}
    </Box>
)
