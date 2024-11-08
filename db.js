const mongoose = require("mongoose");
// Define mongoDB URL
const monogoURL = 'mongodb://localhost:27017/hotels';

// setup MongoDB Connection

mongoose.connect(monogoURL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
});


const db = mongoose.connection; 

db.on('connected', ()=> {
    console.log("Connected to MongoDb server");
});


db.on('error', (err)=> {
    console.error("MongoDB connection error: ",err);
});


db.on('disconnected', ()=> {
    console.log("MongoDB disconnected");
});


// Export file to main file

module.exports = db;