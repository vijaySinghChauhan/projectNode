const mongoose  = require("mongoose");
const { use } = require("../controller/router");

const loginSchema = new mongoose.Schema({
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    }
})

const loginSchema1= new mongoose.model("login",loginSchema);
module.exports= loginSchema1;

