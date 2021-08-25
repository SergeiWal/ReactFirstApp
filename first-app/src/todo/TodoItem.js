import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";

//Object with styles
const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
  },
  input: {
    marginRight: "1rem",
  },
};

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);

  //Array for css classes
  const classes = [];

  if (todo.complited) {
    classes.push("done");
  }

  return (
    <li style={styles.li}>
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          checked={todo.complited}
          style={styles.input}
          onChange={() => {
            onChange(todo.id);
          }}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>
      <button className="rm" onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  );
}

//Validation
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func,
};

export default TodoItem;
