const express = require('express');
const mongoose = require('mongoose');

const app = express();

const users = require('./app/users');
const tasks = require('./app/tasks');

const port = 8000;

app.use(express.json());

const run = async () => {
    await mongoose.connect('mongodb://localhost/todo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    app.use('/users', users);
    app.use('/tasks', tasks);
    app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    })
};
run().catch(e => {
    console.error(e)
});