const multer  = require('multer');
const express = require('express');
var router = express.Router();
var registerSchema = require("../model/register_schema");
var productSchema = require("../model/product_list_schema");
const { v4:uuidv4} =require('uuid');




router.get('/',function(req,res)
{
    res.render('index')
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


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
  
    filename: function (req, file, cb) {
        cb(null,file.originalname);
        // cb(null, uuidv4()+'-'+ Date.now() + path.extname(file.originalname)) //Appending .jpg
      }

  });
  
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }
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
            name:'file1',
            maxCount:1
        },
        {
            name: 'file2', maxCount:2
        }
    ]
);

function checkFileType(file, cb) {
    if (file.fieldname === "file1") {
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ) { // check file type to be pdf, doc, or docx
              cb(null, true);
          } else {
              cb(null, false); // else fails
          }
    }
    else if (file.fieldname === "file2" ) {
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
        // img2: req.file.img2,
        // filename: req.file.filename
     
    };
    var repost = new productSchema(add_product);
    repost.save()
    .then(()=> res.json("added successfully"))
    .catch( err => res.status(400).json("error"+ err))
});

router.get('/view_products',async(req,res)=>
{
    try{
        const product_data= await productSchema.find({})
        res.render('dashboard/view_products',{product_data: product_data});
    
        console.log(product_data);
    
            }
            catch(err)
            {
                console.log(err);
            }
}
);


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
