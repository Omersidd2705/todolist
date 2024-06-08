const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo.js'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err)); // Define err variable here
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({_id:id}, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err)); // Define err variable here
});

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => res.json(err)); // Define err variable here
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({_id:id},{done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err)); // Define err variable here
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
