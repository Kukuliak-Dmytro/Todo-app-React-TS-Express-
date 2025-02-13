import TodoList from './components/todoList/todoList'
import './App.css'

function App() {

  return (
    <>
    <div className="app-header">
      <h1>Todo app </h1>
    </div>

      <div className="app-list">
        <TodoList></TodoList>
      </div> 
    </>
  )
}

export default App
