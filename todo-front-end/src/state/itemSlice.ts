import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface TodoItemType {
    id: number;
    title: string;
    content: string;
    isCompleted: boolean;
 
}

export interface TodoState {
    todoItems: TodoItemType[];
    status: 'loaded' | 'loading' | 'failed';
    error: string | undefined;
}

const initialState: TodoState = {
    todoItems: [],
    status: 'loading',
    error: undefined
}

const todoItemsSlice = createSlice({
    name: 'todoItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodoItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodoItems.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.todoItems = action.payload;
            })
            .addCase(fetchTodoItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const fetchTodoItems = createAsyncThunk(
    'todoItems/fetchAll',
    async () => {
        try {
            const response = await fetch('http://localhost:3000/items');
            const data: TodoItemType[] = await response.json();
            return data;
        } catch (error) {
            throw Error(`Failed to fetch items: ${error}`);
        }
    }
);

export const deleteTodoItem = createAsyncThunk(
    'todoItems/delete',
    async (id: number, { dispatch }) => {
        try {
            await fetch(`http://localhost:3000/items/${id}`, {
                method: 'DELETE',
            });
            dispatch(fetchTodoItems());
        } catch (error) {
            throw Error(`Failed to delete item: ${error}`);
        }
    }
);

export const addTodoItem = createAsyncThunk(
    'todoItems/add',
    async (item: { title: string, content: string }, { dispatch }) => {
        try {
            const response = await fetch(`http://localhost:3000/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const data: TodoItemType = await response.json();
            dispatch(fetchTodoItems());
            return data;
        } catch (error) {
            throw Error(`Failed to add item: ${error}`);
        }
    }
);

export const editTodoItem = createAsyncThunk(
    'todoItems/edit',
    async (item: TodoItemType, { dispatch }) => {
        try {
            const response = await fetch(`http://localhost:3000/items/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const data: TodoItemType = await response.json();
            dispatch(fetchTodoItems());
            return data;
        } catch (error) {
            throw Error(`Failed to edit item: ${error}`);
        }
    }
);
export const markItemCompleted = createAsyncThunk(
    'todoItems/markCompleted',
    async (id: number, { dispatch }) => {
        try {
            const response = await fetch(`http://localhost:3000/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: true }),
            });
            const data: TodoItemType = await response.json();
            dispatch(fetchTodoItems());
            return data;
        } catch (error) {
            throw Error(`Failed to mark item as completed: ${error}`);
        }
    }
);

export const markItemUnCompleted = createAsyncThunk(
    'todoItems/markCompleted',
    async (id: number, { dispatch }) => {
        try {
            const response = await fetch(`http://localhost:3000/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: false }),
            });
            const data: TodoItemType = await response.json();
            dispatch(fetchTodoItems());
            return data;
        } catch (error) {
            throw Error(`Failed to mark item as completed: ${error}`);
        }
    }
);

export default todoItemsSlice.reducer;
