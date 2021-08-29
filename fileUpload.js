//import cloudinary based modules
const cloudinary=require('cloudinary').v2
const multer=require('multer')
const {CloudinaryStorage}=require("multer-storage-cloudinary")
require('dotenv').config()
//configure cloudinary
cloudinary.config({
    cloud_name:'projectcts',
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

//configure multer-storage-cloudinary
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"User",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})

//configure multer
const multerObj=multer({storage:clStorage})

module.exports=multerObj;
