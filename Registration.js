// Importing Packages
import {Modal,Nav} from 'react-bootstrap'
import { useState } from 'react';
import {Switch, useHistory,useRouteMatch} from 'react-router-dom'
import {Link,Route,BrowserRouter,Redirect} from 'react-router-dom'
import axios from 'axios';
// Importing Components
import Login from './Login';
import Signup from './Signup';

function Registration(props){
    // For Login Status
    let loginStatus=props.loginStatus
    let pathInfo=useRouteMatch()
    let history=useHistory();
    // For Modal Functionality
    const [show, setShow] = useState(true);
    const handleClose = () =>{
      setShow(false)
      history.push('/home')
    };
    
    // For Login functionality
    const loginCredientalVerify=(credential)=>{
        // Make post for crediental verification
        axios.post('/users/login',credential)
        .then(res=>{
            let responseObj=res.data
            if(responseObj.message==="login successfull"){
                // Save token to browser's local memory
                localStorage.setItem("token",responseObj.token)
                localStorage.setItem("user",JSON.stringify(responseObj.user))
                loginStatus(true)
                history.push('/home')
                alert(responseObj.message)
            }else{ 
                alert(responseObj.message)
             }   
        })
        .catch(err=>console.log(err))
    }
    return(
        <BrowserRouter>
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Nav variant="tabs">
                <Nav.Item>
                <Link class="nav-link CategoryTabs active" to="/registration/login">Login</Link>
                </Nav.Item>
                <Nav.Item>
                <Link class="nav-link CategoryTabs" to="/registration/signup">Sign In</Link>
                </Nav.Item>
            </Nav>
        </Modal.Header>
        <Switch>
            <Route path="/registration/login">
              <Login loginCredientalVerify={loginCredientalVerify} />
            </Route>
            <Route path="/registration/signup">
              <Signup />
            </Route>
            <Route path="/registration">
              <Redirect to="/registration/login"/>
            </Route>
        </Switch>
    </Modal>
    </BrowserRouter>
        )
}

export default Registration