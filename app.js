const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const path = require('path');

const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({extended:false}));

app.get('/', (req,res,next) => {
    res.send("<h1>hello world</h1>");
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });