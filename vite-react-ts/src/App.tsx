import { FormEvent, FunctionComponent, useRef } from "react";
import { Todo, todosAtom } from "./lib/atoms";
import { useAtom } from "jotai";
import { v4 } from "uuid";

const TodoComponent: FunctionComponent<{ todo: Todo }> = function ({ todo }) {
  const [, setTodos] = useAtom(todosAtom);
  const handleToggleTodo = function (todoId: string) {
    setTodos((todos) =>
      todos.map((t) => {
        if (t.id === todoId) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      })
    );
  };
  return (
    <>
      <input
        id={todo.id}
        type="checkbox"
        checked={todo.completed}
        value={todo.text}
        onChange={() => handleToggleTodo(todo.id)}
      />
      <label htmlFor={todo.id}>{todo.text}</label>
    </>
  );
};

const App: FunctionComponent = function () {
  const [todos, setTodos] = useAtom(todosAtom);
  const todoRef = useRef<HTMLInputElement>(null);
  const handleAddTodo = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todoText = formData.get("todo");
    if (todoText) {
      setTodos([
        {
          id: v4(),
          text: todoText.toString(),
          completed: false,
        },
        ...todos,
      ]);
      if (todoRef.current) {
        todoRef.current.value = "";
      }
    }
  };
  return (
    <div className="w-full py-10 min-h-screen">
      <div className="h-full todos-wrapper max-w-xl mx-auto">
        <form onSubmit={handleAddTodo} className="w-full">
          <input
            ref={todoRef}
            name="todo"
            type="text"
            className="w-full bg-slate-200 p-2 mb-4"
            placeholder="Add new todo..."
          />
        </form>
        <ul>
          {todos.length === 0 && <li>No todos</li>}
          {todos.map((todo) => (
            <li
              aria-checked={todo.completed}
              key={todo.id}
              className="flex items-center gap-2 rounded-sm p-2 mb-2 bg-slate-100 transition-all aria-checked:opacity-25 aria-checked:bg-slate-200"
            >
              <TodoComponent todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
