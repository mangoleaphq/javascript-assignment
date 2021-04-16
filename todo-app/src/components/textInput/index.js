import { useState } from "react";
import { withData } from "../../context/dataContext";
import "./index.css";

function TextInput({ createItem }) {
  const [task, setTask] = useState("");
  const addTodo = () => {
    createItem(task);
    setTask("");
  };
  return (
    <div className="text-input-container">
      <input
        type="text"
        placeholder="Enter the task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            addTodo();
          }
        }}
      />
      <button onClick={() => addTodo()}>Add ToDo</button>
    </div>
  );
}

export default withData(TextInput);
