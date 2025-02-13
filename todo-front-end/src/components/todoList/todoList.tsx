import { useEffect, useState } from 'react';
import Todo from "../todoItem/todo";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../state/store';
import { fetchTodoItems } from '../../state/itemSlice';
import './todoList.css';

export default function TodoList() {
    const myItems = useSelector((state: RootState) => state.todoItemsStore.todoItems);
    const dispatch = useDispatch<AppDispatch>();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        dispatch(fetchTodoItems());
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

    return (
        <div className="list-wrapper">
            <div className="items-wrapper">
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