import "./index.css";

function TextInput() {
  return (
    <div className="text-input-container">
        <input type="text" placeholder="Enter the task"/>
        <button>Add ToDo</button>
    </div>
  );
}

export default TextInput;
