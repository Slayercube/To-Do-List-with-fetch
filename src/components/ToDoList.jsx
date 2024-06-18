import axios from "axios";
import { useState } from "react";
import "../App.css";

const ToDoList = () => {
  const [newTask, setNewTask] = useState("");
  const [task, setTask] = useState([]);

  function handleChange(e) {
    setNewTask(e.target.value);
  }
  async function addTask() {
    if (newTask.trim() !== "") {
      // if the add task does not work please make a user in todo api thanks 
      let res = await axios.post("https://playground.4geeks.com/todo/todos/sidhu", {
        label: newTask,
      });
      let newTaskList = [...task, res.data];
      console.log(res.data);
      setTask(newTaskList);
      setNewTask("");
    }
  }
  async function handleDelete(index) {
    await axios.delete(`https://playground.4geeks.com/todo/todos/${task[index].id}`);
    let newTaskList = task.filter((e, i) => i !== index);
    setTask(newTaskList);
  }

  return (
    <>
      <div className="container-fluid">
        <h1 className="h1">ToDo List</h1>
        <div className="inputBar">
          <input className="input" onChange={handleChange}
            onKeyPress={(event) => {
        if (event.key === 'Enter') {
            addTask();
            event.preventDefault(); 
        }
    }}           

           type="text" value={newTask} />
          <button id="btn2" className="btn btn-dark" onClick={addTask}>
            add
          </button>
        </div>

        <th className="th">
          {task.map((e, i) => (
            <li className="li" key={i}>
              <span className="text">{e.label}</span>

              <button id="btn1" onClick={() => handleDelete(i)} className="btn        btn-danger">
                X
              </button>
            </li>
          ))}
        </th>
      </div>
    </>
  );
};

export default ToDoList;
