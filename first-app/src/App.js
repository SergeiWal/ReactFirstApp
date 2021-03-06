import React, { useEffect } from "react";
import TodoList from "./todo/TodoList";
import Context from "./context";
import Loader from "./loader";
import Modal from "./modal/modal";

//Lazy loading
const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./todo/AddTodo"));
      }, 3000);
    })
);

function App() {
  //Statemeths with hook "useState"
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  //Require to server
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  //Set checbox
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
        <h1>Todos</h1>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={_addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
