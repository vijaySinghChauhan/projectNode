const mongoose  = require("mongoose");

const orderSchema = new mongoose.Schema({
    fullname:
    {
        type:String,
        required:true
    },
    itemsnames:
    {
        type:Array,
        required:true
    },
    img:
    {
        type:String,
        required:true
    },
    time:
    {
        type:String,
        required:true
    },
    price:
    {
        type:String,
        required:true
    },
    qty:
    {
        type:String,
        required:true
    },
    address:
    {
        type:String,
        required:true
    },
    orderno:
    {
        type:String,
        required:true
    },
    orderid:
    {
        type:String,
        required:true
    },
})

const orderSchema1= new mongoose.model("register",orderSchema);
module.exports= orderSchema1;

