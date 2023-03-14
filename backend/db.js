const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/iplanner?"

//connect to mongo db 
const connectToMongo = () => {
    //()=> is callback function
    mongoose.connect(mongoURI);
    console.log("Successfully connected to Mongodb")
}

module.exports = connectToMongo;