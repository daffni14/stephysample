// Create mini exp app
const exp=require('express')
const adminAPI=exp.Router()
// parching API
adminAPI.use(exp.json())
let adminCollectionObj;
// Middleware to set adminCollectionObj
adminAPI.use('/',(req,res,next)=>{
    adminCollectionObj=req.app.get('adminCollectionObj')
    next()
})




// Export
module.exports=adminAPI;