//load env var
if(process.env.NODE_ENV!="production")
require("dotenv").config()

const mongoose=require('mongoose')
async function connectToDb(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}
module.exports=connectToDb