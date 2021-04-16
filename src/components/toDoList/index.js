import ToDoItem from "../toDoItem";
import "./index.css";
function ToDoList() {
  return (
    <div className="main-container">
      <div className="filter-dropdown-menu">
        <select>
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>
      <ToDoItem text="Pay Electricity Bill"/>
    </div>
  );
}

export default ToDoList;
