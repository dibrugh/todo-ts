import { create } from "zustand";

import { generateId } from "../helpers";

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

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [
        {
            id: '1',
            title: 'Default test task',
            createdAt: 2331,
        }
    ],
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
}));