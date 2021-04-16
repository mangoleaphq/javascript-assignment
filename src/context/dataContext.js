import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext({
  list: [],
  createItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
});

function DataProvider({ children }) {
  const [list, setList] = useState([
    {
      title: "Learn to fly",
      isPending: true,
    },
    {
      title: "Learn to fly",
      isPending: true,
    },
  ]);
  const createItem = async (title) => {
    var newList = [
      ...list,
      {
        title,
        isPending: true,
      },
    ];
    setList(newList);
  };

  const updateItem = async (index, updatedItem) => {
    var newList = [...list];
    newList[index] = updatedItem;
    setList(newList);
  };

  const deleteItem = async (index) => {
    var newList = list.filter((item, idx) => idx !== index);
    setList(newList);
  };

  return (
    <DataContext.Provider
      value={{
        list: list,
        createItem: createItem,
        updateItem: updateItem,
        deleteItem: deleteItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function withData(Component) {
  return (props) => {
    return (
      <DataContext.Consumer>
        {(value) => {
          return <Component {...value} {...props} />;
        }}
      </DataContext.Consumer>
    );
  };
}

export default DataProvider;

export { DataContext, withData };
