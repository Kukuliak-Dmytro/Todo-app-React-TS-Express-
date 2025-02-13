import React, { useEffect, useState } from 'react';
import Todo from "../todoItem/todo";
import { useSelector, useDispatch } from 'react-redux';
import { RootState,AppDispatch } from '../../state/store';
import { fetchTodoItems } from '../../state/itemSlice';


export default function TodoList() {
    const myItems=useSelector((state:RootState)=>state.todoItemsStore.todoItems)
    const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{dispatch(fetchTodoItems())},[])
    return (
        <div className="list-wrapper">
            {myItems.length > 0 && (
                <>
                    <Todo item={myItems[0]} />
                    <Todo item={myItems[1]} />
                    <Todo item={myItems[2]} />
                </>
            )}
        </div>
    );
}