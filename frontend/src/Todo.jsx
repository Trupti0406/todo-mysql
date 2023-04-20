import React, { useState, useEffect } from "react";

const defaultinput = { todo_name: "" };
function ToDoApp() {
  const [todoName, setTodoName] = useState(defaultinput);
  const [toDoList, setTodoList] = useState([]);

  //To handle the POST Request to the server when form are submitted.
  const handleSubmit = async (e) => {
    const { todo_name } = todoName;

    e.preventDefault();
    try {
      await fetch("http://localhost:3200/db", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ todo_name }),
      }).then((response) => {
        response.json();
        fetchAllTodo();
      });
    } catch (err) {
      console.error(err.message);
    }
    setTodoName(defaultinput);
  };

  // GET request to the server to retrive all TODO datas using "fetch API" inside "fetchAllTodos"
  const fetchAllTodo = () => {
    fetch("http://localhost:3200/db/get", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setTodoList(data.data))
      .catch((error) => console.log(error));
  };
  //calling the "fetchAllTodos" function inside useEffect hooks to see realtime changes on UI
  useEffect(() => {
    fetchAllTodo();
  }, []);

  //Making Delete Request to Server to delete the specific task.
  const handleDelete = (id) => {
    try {
      fetch(`http://localhost:3200/db/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json());
      // update the to-do list state by removing the deleted item
      setTodoList(toDoList.filter((data) => data.data !== id));

      // After deletion we again call the fetchAllTodo function to see the updated TODO lists
      fetchAllTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-3 mt-md-5">TODO List App</h1>

      {/* Input Area Code */}
      <form onSubmit={handleSubmit} className="p-5">
        {/* Input */}
        <div className="mb-3">
          <div className="input__group input-group">
            <span className="bg-info p-3 fw-semibold" id="basic-addon3">
              Enter The Task:
            </span>
            <input
              type="text"
              className="form-control p-3 fw-semibold"
              id="title"
              aria-describedby="basic-addon3 basic-addon4"
              placeholder="Go to the library"
              required
              value={todoName.todo_name}
              onChange={(e) =>
                setTodoName({ ...todoName, todo_name: e.target.value })
              }
            />
            <span>
              <button
                type="submit"
                className="btn btn-success p-3 ms-2 rounded fw-semibold"
              >
                Add Task
              </button>
            </span>
          </div>
        </div>
      </form>

      {/* Output Area Code */}
      <div>
        <ul className="output-list list-group mt-5 w-md-75">
          {toDoList.map((tasks) => {
            return (
              <li
                className="list-group-item mb-3 py-3 rounded fw-bold bg-light d-flex space-between"
                key={tasks.todo_id}
              >
                <p>{tasks.todo_name}</p>
                <button
                  onClick={() => handleDelete(tasks.todo_id)}
                  className="btn btn-danger
                "
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default ToDoApp;
