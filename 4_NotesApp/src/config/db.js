const mongoose = require('mongoose');

const connectDataBase = async()=>{
    try {
        await mongoose.connect(process.env.mongoDB_uri)
        console.log('DataBase connect successfully');
    } catch (error) {
        console.log("error in Data Base connection", error)
    }
}

module.exports = connectDataBase;