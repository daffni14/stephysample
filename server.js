// Create express server
const exp=require('express')
const app=exp()
const path=require('path')
// For DB link
require('dotenv').config()
// To Connect Front end backend
app.use(exp.static(path.join(__dirname,'./build/')))
// Connect to DB
const mongoClient=require('mongodb').MongoClient
const databaseUrl=process.env.databaseUrl
mongoClient.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("err in db connection",err)
    }else{
      // Database obj
        let databaseObj=client.db("BouquetFlowerShop")
      // Collection Obj
        let userCollectionObj=databaseObj.collection("usercollection")
        let productCollectionObj=databaseObj.collection("productcollection")
        let adminCollectionObj=databaseObj.collection("admincollection")
        let userCartCollectionObj=databaseObj.collection("usercartcollection")
        // Sharing collection obj to API
        app.set("userCollectionObj",userCollectionObj)
        app.set("productCollectionObj",productCollectionObj)
        app.set("adminCollectionObj",adminCollectionObj)
        app.set("userCartCollectionObj",userCartCollectionObj)
        console.log(" Database connected")
    }
})

// Importing API
const userAPI=require('./APIs/user-api')
const productAPI=require('./APIs/product-api')
const adminAPI=require('./APIs/Admin-api')
// To evaluate path to execute espcific api
app.use('/users',userAPI)
app.use('/products',productAPI)
app.use('/admin',adminAPI)






// Redirecting for Invalid path
app.get('/*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./build/index.html'),function(err){
      if(err){
          res.status(500).send(err)
      }
  })
})

// assign port
const port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server started on ${port}`)
})
