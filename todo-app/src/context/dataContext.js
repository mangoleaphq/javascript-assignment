import React, { createContext, useState, useEffect } from "react";

const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

const DataContext = createContext({
  list: [],
  createItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
});

function DataProvider({ children }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function initialLoad() {
      var localData = await asyncLocalStorage.getItem("todo-list");
      if (localData) {
        var initialList = JSON.parse(localData);
        setList(initialList);
      }
    }
    initialLoad();
  }, []);

  const createItem = async (title) => {
    var newList = [
      ...list,
      {
        title,
        isPending: true,
      },
    ];
    await asyncLocalStorage.setItem("todo-list", JSON.stringify(newList));
    setList(newList);
  };

  const updateItem = async (index, updatedItem) => {
    var newList = [...list];
    newList[index] = updatedItem;
    await asyncLocalStorage.setItem("todo-list", JSON.stringify(newList));
    setList(newList);
  };

  const deleteItem = async (index) => {
    var newList = list.filter((item, idx) => idx !== index);
    await asyncLocalStorage.setItem("todo-list", JSON.stringify(newList));
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
