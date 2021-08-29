// Create mini exp app
const exp=require('express')
const expressAsyncHandler=require('express-async-handler')
const productAPI=exp.Router()
// MulterObj
const multerObj=require('./middlewares/fileUpload')
// parching API
productAPI.use(exp.json())
let productCollectionObj;
// Middleware to get productCollectionObj
productAPI.use('/',(req,res,next)=>{
    productCollectionObj=req.app.get('productCollectionObj')
    next()
})


//create product using await
productAPI.post('/createproduct',multerObj.single('photo'),expressAsyncHandler(async(req,res,next)=>{
    // getting product from admin
    let newproduct=JSON.parse(req.body.productObj)
    // Checking weather product exist
    let product=await productCollectionObj.findOne({productname:newproduct.productname})
    //if existed//
    if(product===null){
        newproduct.profileImage=req.file.path
        await productCollectionObj.insertOne(newproduct)
        res.send({message:"New product created"})
    }
    else{
        res.send({message:"product already existed"})
    }
}))
// Display all data
productAPI.get('/getproducts',expressAsyncHandler(async(req,res)=>{
    let productlist=await productCollectionObj.find().toArray()
    res.send({message:productlist})
}))

//get product by Type
productAPI.get("/getproducts/bytype/:producttype",expressAsyncHandler(async(req,res,next)=>{
    let prdType=req.params.producttype;
    let productObj=await productCollectionObj.find({type:prdType}).toArray()
    if(productObj===null){
        res.send({message:"no product found "})
    }
    else{
        res.send({message:productObj})
    }
}))

//get product by Categorytype

productAPI.get("/getproducts/category/type",expressAsyncHandler(async(req,res,next)=>{
    let prodtype=await productCollectionObj.find({"type":{$eq:'Birthday'}}).toArray()
    res.send({message:prodtype})

}))

// Get product by Name
productAPI.get("/getproducts/byname/:prdName",expressAsyncHandler(async(req,res,next)=>{
    let prdName=req.params.prdName;
    let productObj=await productCollectionObj.findOne({productname:prdName})
    if(productObj===null){
        res.send({message:"no product found "})
    }
    else{
        res.send({message:productObj})
    }
}))










// Err handiling
productAPI.use((err,req,res,next)=>{
    res.send({message:err.message})
})

// Export
module.exports=productAPI;