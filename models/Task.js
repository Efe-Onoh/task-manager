//setting up structure using schema and model from mongoose for future collection docs

const mongoose = require('mongoose')

//enforcing document structure because mongodb is a nosql db(i.e all docs have the fields and types)
const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'must provide a name'],
        trim: true,
        maxlength: [20, 'name cannot be more than 20 characters'] //just a few basic validators
    }, 
    completed: {
        type: Boolean,
        default: false,
    }

},{collection: "tasks"})
//model provides actual interface to db. allowing the crud operations. model is to the collection and it takes the proposed collection name and schema to define the structure for data in that collection.
module.exports = mongoose.model('Task', TaskSchema)