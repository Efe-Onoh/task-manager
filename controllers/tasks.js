//contains functionality for routing tasks
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const getAllTasks = asyncWrapper(async (req,res)=>{

        const tasks = await Task.find({})//gets all documents in the collection tasks.
        res.status(200).json({tasks})  //es6 tasks: tasks(value gotten from tasks var)

}) 

const createTask = asyncWrapper( async (req,res)=>{
    
        const task = await Task.create(req.body) //wont proceed until resolved
        res.status(201).json({task}) //send back json as response with req body
    
})

const getTask = asyncWrapper(async (req,res,next)=>{
    
        const {id:taskID} = req.params //destructure id from params and use taskID as alias/var name for the value
        const task = await Task.findOne({_id:taskID})//find and return object where _id is === taskID
       if(!task){
         return next(createCustomError(`No task with id: ${taskID}`, 404))
    
        } 
        res.status(200).json({task})
    
   
})


const deleteTask = asyncWrapper( async (req,res)=>{
   
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
            }
        res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req,res)=>{
    
        const {id:taskID} = req.params

        const task = await Task.findOneAndUpdate({_id: taskID}, req.body,{
            new: true,
            runValidators: true
        })//without options obj, response sends back the old value
        
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
         }

        res.status(200).json({task})
   
})


module.exports =  {
    getAllTasks,
    createTask, 
    getTask, 
    updateTask, 
    deleteTask
}