const multer  = require('multer');
const express = require('express');
var router = express.Router();
var registerSchema = require("../model/register_schema");
var productSchema = require("../model/product_list_schema");
const { v4:uuidv4} =require('uuid');
const loginSchema = require('../model/login_schema');
const session = require('express-session');



router.get('/',async(req,res)=>
    {
        try{
            const product_data= await productSchema.find({})
            res.render('index',{product_data: product_data});
              // res.json(product_data);
            console.log(product_data);
        
                }
                catch(err)
                {
                    console.log(err);
                }
    }
    );

router.get('/about',function(req,res)
{
    res.render('about')
});

router.get('/contact',function(req,res)
{
    res.render('contact')
}
);

router.get('/blog',function(req,res)
{
    res.render('blog')
}
);
router.get('/orders',function(req,res)
{
    res.render('dashboard/orders')
}
);

router.get('/signup',function(req,res)
{
    res.render('signup')
}
);


router.post('/signup',(req,res) => {

    var register = {
        fullname : req.body.fullname,
        email: req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        confirmpassword : req.body.confirmpassword,
        address: req.body.address,
        gender: req.body.gender,
        agreement: req.body.agreement
    };
    var repost = new registerSchema(register);
    repost.save()
    .then(()=> res.json("register successfully"))
    .catch( err => res.status(400).json("error"+ err))
});



router.get('/signin',function(req,res)
{
    res.render('signin')
}
);


router.get('/profile',function(req,res)
{
    res.render('profile')
}
);
router.get('/carreers',function(req,res)
{
    res.render('carreers')
}
);

router.get('/dashboard',function(req,res)
{
    res.render('dashboard/index')
}
);

router.get('/add_product',function(req,res)
{
    res.render('dashboard/add_product')
}
);

var filename1='image.jpeg'
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
  
    filename: function (req, file, cb) {
       //cb(null,file.originalname);
        filename1 = uuidv4()+'-'+ Date.now()+'.jpeg';
        cb(null, filename1 ) //Appending .jpg
      }

  });
  

//   let upload = multer({ storage, fileFilter });
  const cpUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).fields(
    [
        {
            name:'img1',
            maxCount:1
        },
        {
            name: 'img2', maxCount:2
        }
    ]
);

function checkFileType(file, cb) {
    if (file.fieldname === "img1") {
        if (   file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'

            // || file.mimetype === 'application/pdf' ||
            // file.mimetype === 'application/msword' ||
            // file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          
        ) { // check file type to be pdf, doc, or docx
              cb(null, true);
          } else {
              cb(null, false); // else fails
          }
    }
    else if (file.fieldname === "img2" ) {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'||
            fiel.mimetype==='image/gif'
          ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
          } else {
            cb(null, false); // else fails
          }
        }
    }
// Add product Api
router.post('/dashboard/add_product', cpUpload,(req,res) => {

    var add_product = {
        product_name : req.body.product_name,
        product_categorie: req.body.product_categorie,
        available_quantity : req.body.available_quantity,
        product_weight : req.body.product_weight,
        percentage_discount : req.body.percentage_discount,
        stock_alert: req.body.stock_alert,
        price: req.body.price,
        product_description: req.body.product_description,
        product_id: req.body.product_id,
        product_main_id: req.body.product_main_id,
        img1: filename1,
        img2: filename1
     
    };
    var repost = new productSchema(add_product);
    repost.save()
    .then(()=> res.json("added successfully"))
    .catch( err => res.status(400).json("error"+ err))
});

//  Login Api
router.post('/signin', async(req,res) => {

        try {
            const user = await loginSchema.findOne({ where: { email: req.body.email } });
        
            if (!user) {
                return res.status(404).send('User not found');
            }
        
            const isMatch = await user.comparePassword(password);
        
            if (!isMatch) {
                return res.status(401).send('Invalid password');
            }
        
            res.status(200).send('Login successful');
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }

});

    


// Update product Api
router.post('/edit/:id', cpUpload,(req,res) => {

    var add_product = {
        product_name : req.body.product_name,
        product_categorie: req.body.product_categorie,
        available_quantity : req.body.available_quantity,
        product_weight : req.body.product_weight,
        percentage_discount : req.body.percentage_discount,
        stock_alert: req.body.stock_alert,
        price: req.body.price,
        product_description: req.body.product_description,
        product_id: req.body.product_id,
        product_main_id: req.body.product_main_id,
        img1: filename1,
        img2: filename1
     
    };
    var repost = new productSchema(add_product);
    repost.save()
    .then(()=> res.json("updated successfully"))
    .catch( err => res.status(400).json("error"+ err))
});

// Get Api view Products
router.get('/view_products',async(req,res)=>
{
    try{
        const product_data= await productSchema.find({})
        res.render('dashboard/view_products',{product_data: product_data});
          // res.json(product_data);
        console.log(product_data);
    
            }
            catch(err)
            {
                console.log(err);
            }
}
);

//Get Api  Products for main page

//   Edit  Product API by id
router.get("/edit/:id", async(req,res)=>
    {
    try{    
    const prodData = await productSchema.findById(req.params.id);
    res.render('dashboard/edit_product',{prodData: prodData});
    }
    catch(err)
    {
        console.log(err)
    }
    }
    )



//     router.get('/detail_page/:id',function(req,res)
// {
//     res.render('dashboard/detail_page')
// }
// );

  //   detail  Product API by id
   router.get('/detail_page/:id', async(req,res)=>
    {
    try{    
    const prodData = await productSchema.findById(req.params.id);
    res.render('detail_page',{prodData: prodData});
    }
    catch(err)
    {
        console.log(err)
    }
    }
    )
    //   detail  Product API by id
// router.get("/product/:id", async(req,res)=>
//     {
//     try{    
//     const prodData = await productSchema.findById(req.params.id);
//     res.render('dashboard/detail_page',{prodData: prodData});
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
//     }
//     )


//     Delete API
router.get("/delete/:id", async(req,res)=>
{
try{    
const prodData = await productSchema.findByIdAndDelete(req.params.id);
res.redirect('/view_products');
}
catch(err)
{
    console.log(err)
}
}
)

router.get('/add_resturants',function(req,res)
{
    res.render('dashboard/add_resturants')
}
);

router.get('/cart',function(req,res)
{
    res.render('dashboard/cart')
}
);




router.get("/view_registrations", async (req,res) => {
        try{
    const data= await registerSchema.find({})
    res.render('dashboard/view_registrations',{data: data});

    console.log(data);

        }
        catch(err)
        {
            console.log(err);
        }
});

module.exports = router
