const express = require('express');
const app = express();
const fileRouter = require('./routes/file.routes')
app.use(express.json());
app.use('/api', fileRouter);


module.exports = app;