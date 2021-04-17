import React, { useState } from "react";
import ToDoItem from "../toDoItem";
import { withData } from "../../context/dataContext";
import "./index.css";

function ToDoList({ list }) {
  const [filter, setFilter] = useState("all");

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="filter-dropdown-menu">
        <select onChange={changeFilter}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <>
        {list.map((item, index) => {
          if (
            filter === "all" ||
            (filter === "pending" && item.isPending) ||
            (filter === "completed" && !item.isPending)
          ) {
            return <ToDoItem key={index + "list"} item={item} index={index} />;
          } else {
            return null;
          }
        })}
      </>
    </div>
  );
}

export default withData(ToDoList);
