import React, { useState, useRef, useEffect } from "react";
import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdModeEdit,
  MdDelete,
  MdCheck,
  MdCancel,
} from "react-icons/md";
import { withData } from "../../context/dataContext";
import "./index.css";

function ToDoItem({ item, index, updateItem, deleteItem }) {
  const { title, isPending } = item;

  const textInput = useRef(null);

  const [currentText, setCurrentText] = useState(title);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (editMode) {
      textInput.current?.focus();
    }
  }, [editMode]);

  const updatePending = () => {
    var newItem = {
      ...item,
      isPending: !isPending,
    };
    updateItem(index, newItem);
  };

  const updateText = () => {
    var newItem = {
      ...item,
      title: currentText,
    };
    updateItem(index, newItem);
    setEditMode(false);
  };

  return (
    <div className="todo-item-container">
      <div className="action-item">
        {isPending ? (
          <MdRadioButtonUnchecked
            visibility={`${editMode ? "hidden" : "visible"}`}
            onClick={() => updatePending()}
          />
        ) : (
          <MdCheckCircle color="#00D84A" onClick={() => updatePending()} />
        )}
      </div>
      {editMode ? (
        <>
          <input
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            ref={textInput}
          />
          <div className="action-item">
            <MdCheck color="#00D84A" onClick={() => updateText()} />
            <MdCancel
              color="#E21717"
              onClick={() => {
                setCurrentText(title);
                setEditMode(false);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <p
            className={`${isPending ? "" : "completed"}`}
            onDoubleClick={() => setEditMode(true)}
          >
            {title}
          </p>
          <div className="action-item">
            <MdModeEdit
              visibility={`${isPending ? "visible" : "hidden"}`}
              onClick={() => setEditMode(true)}
            />
            <MdDelete onClick={() => deleteItem(index)} />
          </div>
        </>
      )}
    </div>
  );
}

export default withData(ToDoItem);
