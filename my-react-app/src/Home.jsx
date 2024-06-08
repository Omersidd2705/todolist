import React, { useState, useEffect } from 'react';
import { BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Import BsFillTrashFill
import Create from './Create';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result =>{
        location.reload()
      } )
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/`+id)
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/`+id)
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No records</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className='task'>
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              {todo.done ? 
                <BsFillCheckCircleFill className="icon" /> 
                : 
                <BsFillCheckCircleFill className="icon inactive" />
              }
            </div>
            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            <div>
              {/* Moved onClick handler inside the <BsFillTrashFill /> element */}
              <span> 
                <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
