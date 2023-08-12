const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const path = require('path');
const mongoose = require('mongoose');

const dbUri = process.env.DB_URI;
const port = process.env.PORT;


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//router add+
const taskRoutes = require('./routes/task.routes.js');

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));


// router settings
app.use(taskRoutes);

//mongoose Connection
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(result => {
    console.log("connection mongoDB");
  }).catch(error => {
    console.log(error)
  })

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });