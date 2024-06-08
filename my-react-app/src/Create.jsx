import  { useState } from 'react';
import axios from 'axios';

function Create() {
  const [task, setTask] = useState(''); // Correctly initialize useState with an empty string

  const handleAdd = () => {
    axios.post('http://localhost:3001/add', { task: task }) // Fixed URL and task payload
      .then(result => location.reload()) // Access response data
      .catch(error => console.error('Error adding task:', error)); // Corrected syntax for catch
  };

  return (
    <div className='create_form'>
      <input 
        type="text" 
        placeholder='Enter task' 
        value={task} // Use value instead of defaultValue to bind input to state
        onChange={(e) => setTask(e.target.value)} // Corrected onChange event handler
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
