const mongoose  = require("mongoose");

const registerSchema = new mongoose.Schema({
    fullname:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    confirmpassword:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:String,
        required:true
    },
    address:
    {
        type:String,
        required:true
    },
    gender:
    {
        type:String,
        required:true
    },
    agreement:
    {
        type:String,
        required:true
    },
})

const registerSchema1= new mongoose.model("register",registerSchema);
module.exports= registerSchema1;

