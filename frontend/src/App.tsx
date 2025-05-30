import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Header from './components/layouts/Header';
import { getTodos, createTodo, deleteTodo as deleteTodoAPI, updateTodo as updateTodoAPI } from './services/todoService';

interface Todo {
  id?: number;
  title: string;
  location: string;
  date: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    const res = await createTodo(todo);
    setTodos([res.data, ...todos]);
  };

  const deleteTodo = async (id: number) => {
    await deleteTodoAPI(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id: number, data: Omit<Todo, 'id'>) => {
    const res = await updateTodoAPI(id, data);
    setTodos(
      todos.map((todo) => (todo.id === id ? res.data : todo))
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <header>
        <Header />
      </header>
      <h1 className="text-3xl font-bold text-center mt-10 mb-6">📝 Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <div className='mt-10'>
        <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
      </div>
    </div>
  );
}

export default App;
