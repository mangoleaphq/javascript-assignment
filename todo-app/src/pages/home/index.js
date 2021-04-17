import React from "react";
import TextInput from "../../components/textInput";
import ToDoList from "../../components/toDoList";
import "./index.css";

function Home() {
  return (
    <div className="home-container">
      <div className="head">To Do List</div>
      <TextInput />
      <ToDoList />
    </div>
  );
}

export default Home;
