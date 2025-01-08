const mongoose  = require("mongoose");
const bcrypt = require('bcrypt');
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
registerSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword,10);
    }
    next();
})
//creating collection
registerSchema.methods.comparePassword = async function(password){
    const user = this;
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Password is incorrect');
    }
    return user;
}
const registerSchema1= new mongoose.model("register",registerSchema);
module.exports= registerSchema1;

