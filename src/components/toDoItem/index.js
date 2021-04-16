import { useState } from "react";
import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdModeEdit,
  MdDelete,
  MdCheck,
  MdCancel,
} from "react-icons/md";
import "./index.css";

function ToDoItem({ text }) {
  const [currentText, setCurrentText] = useState("Pay Electricity Bill");
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="todo-item-container">
      <div className="action-item">
        {/* <MdCheckCircle color="#00D84A" /> */}
        <MdRadioButtonUnchecked />
      </div>
      {editMode ? (
        <>
          <input
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
          <div className="action-item">
            <MdCheck color="#00D84A" />
            <MdCancel
              color="#E21717"
              onClick={() => {
                setCurrentText(text);
                setEditMode(false);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <p>{text}</p>
          <div className="action-item">
            <MdModeEdit onClick={() => setEditMode(true)} />
            <MdDelete />
          </div>
        </>
      )}
    </div>
  );
}

export default ToDoItem;
