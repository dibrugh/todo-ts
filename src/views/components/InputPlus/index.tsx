import React, { useState, useCallback } from 'react';

import styles from "./index.module.scss";

interface InputPlusProps {
    onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {

    const [inputValue, setInputValue] = useState('')

    // Обновление только если inputValue обновился
    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue])

    return (
        <div className={styles.inputPlus}>
            <input
                className={styles.inputPlusValue}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTask();
                    }
                }}
                placeholder='Type here...'
            />
            <button
                className={styles.inputPlusButton}
                onClick={addTask}
                aria-label='Add'
            />
        </div>
    )
}