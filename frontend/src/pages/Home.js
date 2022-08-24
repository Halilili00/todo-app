import React, { useState } from "react";
import CustomeModal from "../components/Modal";
import TableList from "../components/TableList";
import axios from "axios"
import { useStateContext } from "../context/StateContext";

const Home = () => {
  const [viewCompleted, setVieWCompleted] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const { getData } = useStateContext();

  const displayCompleted = (status) => {
    if (status) {
      return setVieWCompleted(true);
    }
    return setVieWCompleted(false);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const createItem = () => {
    setActiveItem({ title: "", description: "", completed: false });
    setModal(!modal);
  };

  const handleSubmit = (item) => {
    toggle();
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => getData());
        return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => getData());
    alert("saved" + JSON.stringify(item));
  };

  const handleDelete = (item) => {
    axios.delete(`/api/todos/${item.id}`)
    .then((res) => getData());
  }

  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal);
  };

  return (
    <main className="container">
      <h1 className="text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary" onClick={() => createItem()}>
                Add task
              </button>
            </div>
            <ul className="list-group list-group-flush border-top-0">
              <TableList
                viewCompleted={viewCompleted}
                displayCompleted={displayCompleted}
                editItem={editItem}
                deleteItem={handleDelete}
              />
            </ul>
          </div>
        </div>
      </div>
      {modal ? (
        <CustomeModal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
};

export default Home;
