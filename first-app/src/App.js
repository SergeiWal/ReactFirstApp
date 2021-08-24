import React from "react";
import TodoList from "./todo/TodoList";
import Context from "./context";
import { func } from "prop-types";
import AddTodo from "./todo/AddTodo";

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, complited: false, title: "Купить хлеб" },
    { id: 2, complited: false, title: "Купить масло" },
    { id: 3, complited: false, title: "Купить молоко" },
  ]);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complited = !todo.complited;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function _addTodo(title) {
    setTodos(
      todos.concat([
        {
          title: title,
          id: Date.now(),
          complited: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React</h1>
        <AddTodo onCreate={_addTodo} />
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : (
          <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
