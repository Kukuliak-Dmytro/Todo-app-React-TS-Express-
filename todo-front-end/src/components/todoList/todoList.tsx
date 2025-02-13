import {  useEffect, useState } from 'react';
import Todo from "../todoItem/todo";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../state/store';
import { fetchTodoItems, addTodoItem } from '../../state/itemSlice';
import './todoList.css';

export default function TodoList() {
    const myItems = useSelector((state: RootState) => state.todoItemsStore.todoItems);
    const loading = useSelector((state: RootState) => state.todoItemsStore.status);
    const dispatch = useDispatch<AppDispatch>();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        // simulation loading
        setTimeout(() => {
            dispatch(fetchTodoItems());
        }, 1000);
        
    }, [dispatch]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = myItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (indexOfLastItem < myItems.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        dispatch(addTodoItem({ title, content }));
        e.target.title.value = '';
        e.target.content.value = '';
        console.log(e.target.title.value)
                
    }
    if (loading === 'loading') {
        return <div>Loading...</div>;
    }
    else    return (
        <div className="list-wrapper">
            <div className="items-wrapper">
                <form action="" className='form' onSubmit={ (e) => handleSubmit(e,)}>
                    <input type="text" name="title" id=" title" placeholder='Enter task title' required />
                    <input type="text" name="content" id="content" placeholder='Enter task content'  required/>
                    <button type='submit'> Add</button>
                </form>
                Id - Title - Content - Completed - Failed
                {currentItems.length > 0 && currentItems.map((item, index) => (
                    <Todo key={index} item={item} />
                ))}
            
            </div>
             <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} disabled={indexOfLastItem >= myItems.length}>Next</button>
                </div>
        </div>
    );
}