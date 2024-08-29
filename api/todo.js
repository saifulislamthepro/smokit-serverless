// api/todo.js
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();

let todoList = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Home route to display the to-do list
app.get('/', (req, res) => {
  res.render('index', { todoList });
});

// Route to add a new to-do item
app.post('/add', (req, res) => {
  const { item } = req.body;
  if (item) {
    todoList.push({ item, completed: false });
  }
  res.redirect('/');
});

// Route to delete a to-do item
app.post('/delete', (req, res) => {
  const { index } = req.body;
  todoList.splice(index, 1);
  res.redirect('/');
});

// Route to mark an item as completed
app.post('/complete', (req, res) => {
  const { index } = req.body;
  if (todoList[index]) {
    todoList[index].completed = !todoList[index].completed;
  }
  res.redirect('/');
});


module.exports = app;
module.exports.handler = serverless(app);
