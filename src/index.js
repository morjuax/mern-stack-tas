const express = require('express');
const morgan = require('morgan');
const path = require('path');

const {mongoose} = require('./database');

const app = express();
const taskRouter = require('./routes/task.routes');

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use('/api/tasks', taskRouter);

// Static files

 app.use(express.static(path.join(__dirname, 'public')));
// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});