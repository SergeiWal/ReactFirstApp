import React, { useState } from "react";
import PropTypes from "prop-types";

//my custom hook
function useInputValue(defaultValue = "") {
  //Use state variable with hooks
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value: value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  //invoke my custom hook
  const input = useInputValue("");
  function submitHandler(event) {
    event.preventDefault();
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">Add todo</button>
    </form>
  );
}

//Add validation
AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
