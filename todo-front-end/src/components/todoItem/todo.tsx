import { editTodoItem, TodoItemType } from "../../state/itemSlice";
import "./todo.css";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { deleteTodoItem } from "../../state/itemSlice";
import { markItemCompleted, markItemUnCompleted } from "../../state/itemSlice";
interface Props {
    item: TodoItemType;
}

export default function Todo({ item }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [content, setContent] = useState(item.content);
    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            const newItem = { id: item.id, title, content, isCompleted: item.isCompleted }
            dispatch(editTodoItem(newItem))
        }
    }
    const handleCheckbox = () => {
        if (item.isCompleted) {
            dispatch(markItemUnCompleted(item.id))
        } else {
            dispatch(markItemCompleted(item.id))
        }
    }

    const handleDelete = () => {
        dispatch(deleteTodoItem(item.id));
    }

    return (
        <div className="todo-item-wrapper">
            <span className='status'>
                <input type="checkbox" checked={item.isCompleted} onChange={() => handleCheckbox()} id={`id-${item.id}`} />
                <label className="todo-status" htmlFor={`id-${item.id}`}>
                    {item.isCompleted ? 'Completed' : 'In progress...'}
                </label>
            </span>

            {isEditing ? (
                <>
                    <input
                        className="todo-title-form"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="todo-content-form"

                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <p className="todo-title">{title}</p>
                    <p className="todo-content">{content}</p>
                </>
            )}
            <div className="todo-actions">
                <button className="btn secondary" onClick={() => handleEdit()}>{!isEditing ? 'Edit' : 'Save'}</button>
                <button className="btn danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}