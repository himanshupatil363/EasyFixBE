const mongoose = require('mongoose');
const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:true});
        console.log("MongoDB connection established");
    };

module.exports = connectDB;
