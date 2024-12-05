import React, { useContext, useEffect } from 'react'
import Defaultexport, { Nameexport1, Nameexport2 } from './Export'
import { Application, Card } from './Card'
import products from './data'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './Homepage'
import Mobiles from './Mobiles'
import  data  from './laptopdata'
import Laptops from './Laptops'
import Singlelaptop from './Singlelaptop'
import data1 from './tabletdata'
import  Tablets  from './Tablets'
import Singletablet from './Singletablet'
import data2 from './watchesdata'
import Singlewatches from './Singlewatches'
import { Watches } from './Watches'
import Onelaptop from './LaptopDetails'
import Onetablet from './TabletDetails'
import Onewatch from './WatchDetails'
import Onemobile from './MobileDetails'
import dataa from './mobiledata'

import ThemeContext from './Themecontext'
import RegisterForm from './register'

import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import { UserContext } from './UserContext'
import axios from 'axios'
import PlaceOrder from './PlaceOrder'
import ThankYouPage from './ThankYouPage'
import MobileDetails from './MobileDetails'
import OrderMobile from './OrderMobile'
import OrderLaptop from './OrderLaptop'
import LaptopDetails from './LaptopDetails'
import TabletDetails from './TabletDetails'
import OrderTablet from './OrderTablet'
import WatchDetails from './WatchDetails'
import OrderWatch from './OrderWatch'

import Profile from './Profile'
import MyOrders from './MyOrders'
import ContactPage from './ContactPage'
import FeedbackPage from './FeedbackPage'
import AdminDashboard from './AdminDashboard'
import LoginForm from './Login'














const App = () => {
 console.log("hello")
  let {user,makeUser} =useContext(UserContext)

 useEffect(()=>{
  let token = localStorage.getItem("token")
  let header ={
Authorization:"Bearer "+token
}

axios.get("http://localhost:8000/user/verify",{headers:header})
.then((res)=>{
 makeUser(res.data.data)
})
.catch((err)=>console.log(err))
 },[])

  return (
    <div>
       {/* <Defaultexport></Defaultexport>
      <Nameexport1></Nameexport1>
      <Nameexport2></Nameexport2> */}

      {/* show all cards */}
      {/* <Application></Application> */} 
      {/* <Card data={products[0]}></Card> */}

      {/* <Form></Form> */}
      {/* <Frontpage></Frontpage> */}
        <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path='/register' element={<RegisterForm></RegisterForm>}></Route>
          <Route path='/login' element={<LoginForm/>}></Route>
          <Route path='/' element={<Homepage></Homepage>}></Route>
          <Route path='/Mobiles' element={<Mobiles></Mobiles>}></Route>
          <Route path='/Mobiles/:productId' element={<MobileDetails></MobileDetails>}></Route>
          <Route path="/order/:productId" element={<OrderMobile />} />
          <Route path="/myorders" element={<MyOrders/>} />
          <Route path="/Laptops" element={<Laptops />} />
        <Route path="/Laptops/:productId" element={<LaptopDetails />} />
        <Route path="/LaptopOrder/:productId" element={<OrderLaptop />} />
          <Route path='/Tablets' element={<Tablets></Tablets>}></Route>
          <Route path='/Tablets/:productId' element={<TabletDetails></TabletDetails>}></Route>
          <Route path="/TabletOrder/:productId" element={<OrderTablet/>} />
          <Route path='/Watches' element={<Watches></Watches>}></Route>
          <Route path='/Watches/:productId' element={<WatchDetails></WatchDetails>}></Route>
          <Route path="/WatchOrder/:productId" element={<OrderWatch></OrderWatch>} />
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='/wishlist' element={<Wishlist></Wishlist>}></Route>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/feedback" element={<FeedbackPage/>} />
          <Route path='/thankyou' element={<ThankYouPage></ThankYouPage>}></Route>
        </Routes>
       
        <Onelaptop></Onelaptop>
     
    </div>
  )
}

export default App
