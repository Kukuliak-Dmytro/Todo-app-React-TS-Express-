import { TodoItemType } from "../../types/todo"
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