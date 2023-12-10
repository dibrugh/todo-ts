import React from 'react';
import { Box } from '@mui/material';
import { Header, Panel, ToDoList } from './components';

import './App.css';

export type Todo = {
  id: number;
  name: string;
  description: string;
  checked: boolean;
};

export const App = () => {
  const [todoList, setTodoList] = React.useState([
    { id: 1, name: 'task 1', description: 'test', checked: false, },
    { id: 2, name: 'task 2', description: 'teawdawdawdawdawdawdawdawst', checked: false, },
    { id: 3, name: 'task 3', description: 'test', checked: true, },
]);

  const onDeleteTodo = (id: Todo['id']) => {
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  const onAddTodo = ({name, description}: Omit<Todo, 'id' | 'checked'>) => {
    setTodoList([
      ...todoList, 
      {id: todoList[todoList.length - 1].id + 1, description, name, checked: false}])
  }

  const onCheckTodo = (id: Todo['id']) => {
    setTodoList(todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, checked: !todo.checked}
      }
      return todo;
    }))
  }

  return (
    <div className="App">
      {/* Box вместо div, чтобы было единообразие в проекте */}
      <Box display='flex' flexDirection='column' width="500px">
        <Header />
        <Panel onAddTodo={onAddTodo}/>
        <ToDoList todoList={todoList} onDeleteTodo={onDeleteTodo} onCheckTodo={onCheckTodo}/>
      </Box>
    </div>
  )
}
