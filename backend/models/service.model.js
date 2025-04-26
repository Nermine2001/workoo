const mongoose = require("mongoose");


const serviceSchema = new mongoose.Schema({
    name: String,
    category: String,
    location: String,
    salary: Number,
    description: String,
    image: String,       
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}            
});

module.exports = mongoose.model("Service", serviceSchema);