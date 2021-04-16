import ToDoItem from "../toDoItem";
import { withData } from "../../context/dataContext";
import "./index.css";
function ToDoList({ list }) {
  return (
    <div className="main-container">
      <div className="filter-dropdown-menu">
        <select>
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>
      <>
        {list.map((item, index) => (
          <ToDoItem key={index + "list"} item={item} index={index} />
        ))}
      </>
    </div>
  );
}

export default withData(ToDoList);
