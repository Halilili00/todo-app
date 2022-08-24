import { createContext, useState, useContext, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    fetch("http://127.0.0.1:8000/api/todos/")
      .then((res) => res.json())
      .then((data) => setTodoList(data))
      .catch((error) => console.log("An error occured"));
  };

  return (
    <Context.Provider
      value={{
        todoList,
        setTodoList,
        getData
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
