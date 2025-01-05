const mongoose  = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name:
    {
        type:String,
        required:true
    },
    product_categorie:
    {
        type:String,
        required:true
    },
    
    available_quantity:
    {
        type:String,
        required:true
    },
    product_weight:
    {
        type:String,
        required:true
    },
    percentage_discount:
    {
        type:String,
        required:true
    },
    
    stock_alert:
    {
        type:String,
        required:true
    },
    price:
    {
        type:String,
        required:true
    },
    product_description:
    {
        type:String,
        required:true
    },
    product_id:
    {
        type:String,
        required:true
    },
    product_main_id:
    {
        type:String,
        required:true
    },

    file1:
    {
        type:String,
    },

    file2:
    {
        type:String,
    },
   
})

const productSchema1= new mongoose.model("add_product",productSchema);
module.exports= productSchema1;

