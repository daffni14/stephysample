import '../../css/LoginCSS.css'
// Import package
import {useForm} from 'react-hook-form'
// Import Img
import loginimg from '../../imgs/loginImg.jpg';

function Login(props){
    let loginCredientalVerify=props.loginCredientalVerify
    let {register,handleSubmit,formState:{errors}}=useForm()

    // Form submit Data
    const onFormSubmit=(userobj)=>{
        loginCredientalVerify(userobj)
    }
    return(
        <div id="lg mt-5 mb-5 p-5 shadow">
             <div className="row">
             <div className="col-md-4 col-sm-12 col-xs-4">
                 <img src={loginimg} alt=""className="ms-5 text-center"id="fl"/>  
            </div>
            <div className="col-md-8 col-sm-12 col-xs-8">
            <form className="w-50 mx-auto mt-3"onSubmit={handleSubmit(onFormSubmit)}>
            <h1>Hello!</h1>
            {/* Username */}
            <label htmlFor="un" className="form-label">Username</label>
            <input type="text"id="un"{...register('username',{required:true,minLength:4})} className="form-control mb-3 " autoComplete="off"/>
            {errors.username?.type==='required'&& <p className="text-danger"style={{marginLeft:'0px'}}>*username is required</p>}
            {errors.username?.type==='minLength'&& <p className="text-danger">*min should be 4</p>}
            <label htmlFor="pw" className="form-label">Password</label>
            {/* password */}
            <input type="password"id="pw"{...register('password',{required:true,minLength:8})} className="form-control mb-3"/>
            {errors.password?.type==='required' && <p className="text-danger"style={{marginLeft:'0px'}}>*password is required</p>}
            {errors.password?.type==='minLength' && <p className="text-danger">*min should be 8</p>}
            {/* Submit */}
            <button type="submit" className="btn d-block mx-auto mt-2 mb-4"id="logbtn"><strong>Login</strong></button>
            </form></div></div>


        </div>
    )
} 
export default Login;