// Import Packages
import './css/App.css';
import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import { useState } from 'react';
import {StickyContainer,Sticky} from 'react-sticky'
// Component Imports
import NavBar from './components/Home/NavBar'
import Login from './components/registration/Login'
import AboutUs from './components/Home/AboutUs';
import ContactUs from './components/Home/ContactUs';
import Home from './components/Home'
import Registration from './components/registration/Registration';
import Category from './components/Home/Category';
import Letterbox from './components/Home/Letterbox';
import Addproducts from './components/admin/Addproducts';
import Footer from './components/Home/Footer';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import Test from './components/Test';
import UserProfile from './components/user/UserProfile';
import Cart from './components/user/Cart';
function App() {
  
  //  Login Status
  let [loginMonitor,setLoginMonitor]=useState(false)
  // Cart Status
  let [cartMonitor,setCartMonitor]=useState(1)
  let [cartLength,setCartLength]=useState(0)
  const loginStatus=(status)=>{
    setLoginMonitor(status)    
  }
  
  // user details from localStorage
  let userDetails=JSON.parse(localStorage.getItem('user'))
  return (
  <div className="container-fluid">
    <BrowserRouter>
    <div className="mx-5">
      {/* Nav Bar */}
        <NavBar loginMonitor={loginMonitor} setLoginMonitor={setLoginMonitor} />
      {/* Nav Bar for Category */}
            <Category class="cc"/>
    </div>

      {/* Switch for routing */}
      <Switch>
            <Route path="/registration">
              <Registration loginStatus={loginStatus} />
            </Route>
            <Route path="/wishlist">
              <AboutUs />
            </Route>
            <Route path="/:username/cart">
              <Cart setCartLength={setCartLength}/>
            </Route>
            <Route path="/aboutus">
              <AboutUs />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/userprofile/:username">
              <UserProfile />
            </Route>
            <Route path="/productlist">
                <ProductList />
            </Route>
          <Route path="/productdetails">
                <ProductDetails />
            </Route>
            <Route path="/addproducts">
              <Addproducts />
            </Route>
            <Route path="/">
              <Redirect to="home"/>
            </Route>
          </Switch>
    </BrowserRouter>
    {/* Letter box component */}
    <Letterbox />
    {/* Footer Component */}
    <Footer />
  </div>
  );
}

export default App;
