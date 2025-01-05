const mongoose=require('mongoose');

var conn= mongoose.connect("mongodb+srv://vijaychauhan0056:admin@cluster0.6v4wr.mongodb.net/CoffeeDb?retryWrites=true&w=majority&appName=Cluster0",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connection successfully connected"))
.catch((err)=>console.log(err));

module.exports=conn;