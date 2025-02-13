
import Todo from "../todoItem/todo"
import { TodoItemType } from '../../types/todo'
async function getItems(): Promise<TodoItemType[]> {
    const response = await fetch('http://localhost:3000/items');
    const data = await response.json();
    console.log(data);
    return data;
}
export default function TodoList() {
    const myItems:TodoItemType[] =  getItems()
    return (
        <div className="list-wrapper">
            <Todo item={myItems[1]}></Todo>
            <Todo item={myItems[2]}></Todo>
            <Todo item={myItems[3]}></Todo> 
            </div>
    )
}