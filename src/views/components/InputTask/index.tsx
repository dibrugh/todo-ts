import React, { useState, useRef, useEffect } from 'react';

import styles from "./index.module.scss";

interface InputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {

    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(title)

    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode) {
            // проверяем, чтобы уже была определена, т.к на старте null
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode])

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type='checkbox'
                    checked={checked}
                    disabled={isEditMode}
                    className={styles.inputTaskCheckbox}
                    onChange={(e) => {
                        setChecked(e.target.checked);

                        if (e.target.checked) {
                            // Немного отсрочить, дабы визуально было понятно, что произошло :)
                            setTimeout(() => {
                                onDone(id);
                            }, 300)
                        }
                    }}
                />
                {isEditMode ? (
                    <input
                        value={value}
                        ref={editTitleInputRef}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onEdited(id, value);
                                setIsEditMode(false);
                            }
                        }}
                        className={styles.inputTaskTitleEdit}
                    />
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>
                )}
            </label>
            {isEditMode ? (
                <button
                    aria-label='Save'
                    className={styles.inputTaskSave}
                    onClick={() => {
                        onEdited(id, value);
                        setIsEditMode(false);
                    }}
                />
            ) : (
                <button
                    aria-label='Edit'
                    className={styles.inputTaskEdit}
                    onClick={() => {
                        setIsEditMode(true);
                    }}
                />
            )}
            <button
                aria-label='Remove'
                className={styles.inputTaskRemove}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                }}
            />
        </div>
    )
}