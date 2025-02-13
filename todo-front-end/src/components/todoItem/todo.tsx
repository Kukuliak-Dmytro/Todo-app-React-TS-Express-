import {TodoItemType}  from "../../state/itemSlice"
import "./todo.css"
interface props{
    item:TodoItemType
}
export default function Todo({item}:props) {
    return(
        <div className="todo-item-wrapper">
            {item.id} - {item.title} - {item.content} - {item.isCompleted} - {item.isFailed}

        </div>
    )

}