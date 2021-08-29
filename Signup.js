import '../../css/SignupCSS.css'
// Importing packages
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {useHistory} from'react-router-dom'
import axios from 'axios';
// Importing imgs
import flower from '../../imgs/signupImg.jpg'

function Signup(){
    const history=useHistory()
    const {register,handleSubmit,formState:{errors}}=useForm();
    // For storing img
    const [file,setFile]=useState(null)
    
    //Form on submit 
    const onFormsubmit=(userObj)=>{
            let formData=new FormData();
            //adding image to formdata obj
            formData.append('dp',file,file.name)
            //add userobj to formdata
            formData.append("userObj",JSON.stringify(userObj))
          //pass it to the userapi by http post request
            axios.post('/users/createusers',formData)
            .then(res=>{
            alert(res.data.message)
            if(res.data.message==="user created successfully"){
                history.push('/registration')
            }
            })
            .catch(err=>console.log(err))   
          
     }
    //  For file input field
    const onFileSelect=(event)=>{
        setFile(event.target.files[0])
    }
    return(
        <div className="row" >
        <div className="col-md-3 col-sm-3 ">
                <img className="image" src={flower}  >
                </img>
        </div>
        <div className="col-md-9 col-sm-9">
           <form className=" w-100" onSubmit={handleSubmit(onFormsubmit)}>
               {/* username */}
           <label className=" inputlabel form-control-label ms-5" >Username</label>
           <input type="text" className=" inputfield form-control " {...register('username',{required:true,minLength:4})}></input>
           {errors.username?.type==='required' && <p className="text-danger" style={{marginLeft:'100px'}}>username required</p>}
           {errors.username?.type==='minLength' && <p className="text-danger">minimum length should be 4</p>}
           {/* password */}
           <label className=" inputlabel form-control-label ms-5">Password</label>
           <input type="password" className="inputfield form-control " {...register('password',{required:true,minLength:8})}></input>
           {errors.password?.type==='required' && <p className="text-danger">password required</p>}
           {errors.password?.type==='minLength' && <p className="text-danger">minimum length should be 8</p>}
             {/* email */}
           <label className=" inputlabel form-control-label ms-5">Email</label>
           <input type="email" className="inputfield form-control "  {...register('email',{required:true})}></input>
           {errors.email?.type==='required' && <p className="text-danger" style={{marginLeft:'100px'}}>email required</p>}
            {/* mobile number */}
            <label className=" inputlabel form-control-label ms-5" >Mobile Number</label>
            <input type="number" className=" inputfield form-control"  {...register('mobile',{required:true,minLength:10})}></input>
               {errors.mobile?.type==='required' && <p className="text-danger">enter mobile number</p>}
               {errors.mobile?.type==='minLength' && <p className="text-danger">Invalid Mobile number</p>}
            {/* profile pic */}
            <input type="file" name="photo" className="profile w-50 mb-2 mt-3"{...register('dp',{required:true})} onChange={(e=>onFileSelect(e))}></input><br></br>
            {errors.photo?.type==='required' && <p className="text-danger" style={{marginLeft:'100px'}}>choose a profile pic</p>}
           {/* newsletter checkbox */}
           <input type="checkbox" name="acceptNewsletter" value="accept" className="form-check-input " style={{marginLeft:'100px'}}  {...register('acceptNewsletter')}/>
           <label className="inputlabel form-control-label ms-5" style={{marginLeft:'120px'}}>signin for Newsletter</label>
           {/* button */}
           <button className=" register btn mt-3 mb-2" style={{marginLeft:'100px'}} type="submit">REGISTER</button>
           </form>
        </div>

    </div>
    )
}

export default Signup