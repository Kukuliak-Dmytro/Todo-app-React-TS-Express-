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
    const [isCompleted, setIsCompleted] = useState(item.isCompleted);

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
            <input type="checkbox" name="" id="" checked={item.isCompleted}
                onChange={() => handleCheckbox()}
            />
            <p>{item.id}</p>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
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
            <div className="todo-status">
                <span className={`status ${item.isCompleted ? 'completed' : 'pending'}`}>
                    {item.isCompleted ? 'Completed' : 'Pending'}
                </span>
            </div>
            <div className="todo-actions">
                <button className="btn" onClick={() => handleEdit()}>{!isEditing ? 'Edit' : 'Save'}</button>
                <button className="btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}