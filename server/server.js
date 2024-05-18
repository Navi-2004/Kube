const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
const dotenv=require('dotenv').config();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./db');
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App!');
  });

const quizRoutes = require('./routes/QuizRoutes');
app.use('/quiz', quizRoutes);


const userRoutes = require('./routes/UserRoutes');
app.use('/user',userRoutes)

app.listen(5000,()=>{
    console.log("Server started at port 5000");
})

   