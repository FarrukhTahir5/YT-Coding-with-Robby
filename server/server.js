//load env var
if(process.env.NODE_ENV!="production")
require("dotenv").config()

//Import Dep
const express= require('express')
const connectToDb=require('./config/connectToDb')
const noteController=require('./controllers/notesController')
const cors=require('cors')

//Create exp app
const app=express()

//configure exp app
app.use(express.json());
app.use(cors());
//connect to DB
connectToDb();

//routing
app.get('/notes',noteController.fetchNotes);

app.get('/notes/:id',noteController.fetchNote);

app.post('/notes',noteController.createNote);

app.put('/notes/:id',noteController.updateNote);

app.delete('/notes/:id',noteController.deleteNote)
//start our server
app.listen(process.env.PORT)