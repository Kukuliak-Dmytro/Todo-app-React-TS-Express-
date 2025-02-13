import {configureStore} from '@reduxjs/toolkit';
import TodoItemsReducer from './itemSlice.ts'

export const store = configureStore({
    reducer: {
        todoItemsStore: TodoItemsReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;