import React, { useState, useEffect } from "react";

const defaultField = { todo_name: "" };
function ToDoApp() {
  const [todoName, setTodoName] = useState(defaultField);
  const [toDoList, setTodoList] = useState([]);

  // This function will send a POST request to the server when task is added.
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
        fetchAllTodo(); //fetching all todo items
      });
    } catch (err) {
      console.error(err.message);
    }
    setTodoName(defaultField); //resetting the input to blank
  };

  // This get request will retrive all the todolist items using fetch API
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
  useEffect(() => {
    fetchAllTodo();
  }, []);

  //This DELETE request will be responsible for deleting a particular todolist item with the help of its id
  const handleDelete = (id) => {
    try {
      fetch(`http://localhost:3200/db/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json());
      // To update the todolist state after we've deleted a todolist item
      setTodoList(toDoList.filter((data) => data.data !== id));
      // displaying rest of the tasks
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
                  <i className="fa-solid fa-trash"></i>
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
