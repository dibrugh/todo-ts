import React from 'react';

import { useToDoStore } from '../../data/stores/useToDoStore';

import styles from './index.module.scss'
import { InputPlus } from '../components/InputPlus';

export const App: React.FC = () => {
    // Получаем деструктуризаццией элементы стора
    const [tasks, createTask, updateTask, removeTask] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask
    ]);

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <InputPlus onAdd={(title) => {
                    if (title) {
                        createTask(title)
                    }
                }}/>
            </section>
            <section className={styles.articleSection}>

            </section>
        </article>
    )
}