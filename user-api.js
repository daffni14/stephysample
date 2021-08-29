// Create mini exp app
const exp=require('express')
const userAPI=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
// parching API
userAPI.use(exp.json())
let userCollectionObj;
let userCartCollectionObj;
const multerObj=require('./middlewares/fileUpload')

// Middle ware to asign userCollectionObj
userAPI.use('/',(req,res,next)=>{
    userCollectionObj=req.app.get("userCollectionObj")
    userCartCollectionObj=req.app.get("userCartCollectionObj")
    next()
})

// Get users
userAPI.get("/getusers",expressAsyncHandler(async(req,res,next)=>{
    let userlist=await userCollectionObj.find().toArray()
    res.send({message:userlist})
}))

// Create user
userAPI.post("/createusers",multerObj.single('dp'),expressAsyncHandler(async(req,res)=>{
    let newUser=JSON.parse(req.body.userObj);
    let user=await userCollectionObj.findOne({username:newUser.username})
    if(user===null){
        // hash the password
        let hashedpw= await bcryptjs.hash(newUser.password,7)
        // replace old pw with hashed pw
        newUser.password=hashedpw
        // add img path 
        newUser.profileImg=req.file.path;
        // Add usertype
        newUser.userType="user";
        // Insert data into database
        await userCollectionObj.insertOne(newUser)
        res.send({message:"user created successfully"})
    }else{
        res.send({message:"user already exist"})
    }
}))

// user Login
userAPI.post("/login",expressAsyncHandler(async(req,res)=>{
    let credential=req.body
    // check for username
    let dbuser=await userCollectionObj.findOne({username:credential.username})
    if(dbuser===null){
        res.send({message:"invalid username"})
    }else{
        // compare password
        let pwstatus=await bcryptjs.compare(credential.password,dbuser.password)
        // if password not matched
        if(pwstatus===false){
            res.send({message:"invalid password"})
        }else{
            let token= await jwt.sign({username:credential.username},process.env.secret,{expiresIn:120})
            delete dbuser.password
            res.send({message:"login successfull",token:token,user:dbuser})
        }
    }
}))

// Add Product to cart
userAPI.post('/addtocart',expressAsyncHandler(async(req,res)=>{
    let cartObj=req.body
    // Checking weather user has prd or not
    let prdPresent=await userCartCollectionObj.findOne({username:cartObj.username})
    if(prdPresent===null){
        // IF user has no prd
        userCartCollectionObj.insertOne({username:cartObj.username,products:[cartObj.prdObj]})
        res.send({message:"New Product Added"})
    }else{
        // If user has prd
        prdPresent.products.push(cartObj.prdObj)
        await userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
        res.send({message:"product added"})
    }
}))

// To prduct in Cart
userAPI.get('/getproducts/:username',expressAsyncHandler(async(req,res)=>{
    let username=req.params.username
    let prd= await userCartCollectionObj.findOne({username:username})
    if(prd===null){
        res.send({message:"product no found"})
    }else{
        res.send({message:prd})
    }
}))













// Err handiling
userAPI.use((err,req,res,next)=>{
    res.send({message:err.message})
})

// Export
module.exports=userAPI;