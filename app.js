
const express = require('express') //import express and initialize
const app = express()

//importing router tasks.js
const tasks = require('./routes/tasks')

//import connection functionality from connect
const connectDB = require('./db/connect')

require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))//serve up static files
app.use(express.json()) //so we can access json data in req body when creating tasks

//routes 
//based on app, we get tasks so a get request is needed
//we create tasks so post is needed
//we can delete tasks, so delete is needed
//we can edit so update is needed
//we need to get a single task as well

app.use('/api/v1/tasks', tasks) //make use of router


app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000

const start = async () =>{ //handles in bg while rest of sequential code is run
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))

    }catch(error){
        console.log(error)

    }
}

start()