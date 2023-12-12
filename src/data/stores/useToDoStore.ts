import { create } from "zustand";
// редаксовский devtools как middleware
import { devtools } from 'zustand/middleware'

import { generateId } from "../helpers";
import { State } from "zustand";
import { StateCreator } from "zustand";

// Описываем интерфейс задачи
interface Task {
    id: string;
    title: string;
    createdAt: number;
}

// Описываем интерфейс списка задач
interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

// Пишем Middleware для сохранения стора в localStorage
function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

const localStorageUpdate = <T extends unknown>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
            nextState.tasks
        ))
    }
    set(nextState, ...args);
}, get, api);

const getCurrentState = () => {
    try {
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
        return currentState;
    } catch (error) {
        window.localStorage.setItem('tasks', [])
    }
    return [];
}

export const useToDoStore = create<ToDoStore>(localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
        // актуальный state получаем через get()
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }
        // concat чтобы избежать мутаций
        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            // Сохраняем данные старого таска, меняем только тайтл(содержание)
            tasks: tasks.map((task) => ({ ...task, title: task.id === id ? title : task.title }))
        })
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        });
    },
})));