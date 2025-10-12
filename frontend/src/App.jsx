import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import ManagerHome from './pages/ManagerHome'
import ViewOrders from './pages/ViewOrders'
import UpdateMenuOwner from './pages/UpdateMenuOwner'
import UpdateMenuManag from './pages/UpdateMenuManager'
import ViewMenu from './pages/ViewMenu'
import SubmitOrder from './pages/SubmitOrder'
import UpdateManager from './pages/UpdateManager'
import AddManager from './pages/AddManager'
import Home from './pages/Home'
import OwnerHome from './pages/OwnerHomePage'
import Additems from './pages/Additems'
import Login from './pages/Login'
import UpdatePassword from './pages/UpdatePassword'
import ViewManager from './pages/ViewManager'
import About from './pages/About'
import DownloadMenuPDF from './pages/GenerateMenuPDF';
import PlaceOrder from './pages/PlaceOrder';
import CheckoutForm from './pages/CheckoutForm';
import stripeProvider from './Stripe Payment/StripeProvider'
import { Elements } from '@stripe/react-stripe-js';
import OrderSummary from './pages/OrderSummary';
import UpdateMenuManager from './pages/UpdateMenuManager';
import './index.css'; 
import OrderSuccess from './pages/OrderSuccess';
import AnalyticsPage from './pages/AnalyticsPage';



function App() {

  return (
    <>
    <Elements stripe = {stripeProvider}>
      <Router>
        <Routes>
          <Route path='/managerhome' element={<ManagerHome/>}/>
          <Route path='/view/orders' element={<ViewOrders/>}/>
          <Route path='/view/menu' element={<ViewMenu/>}/>
          <Route path='/update/menu/manager' element={<UpdateMenuManager/>}/>
          <Route path="/updatemenuowner" element={<UpdateMenuOwner/>}/>
          <Route path='/submitorder' element={<SubmitOrder />}/>
          <Route path='/updatemanager' element={ <UpdateManager/>}/>
          <Route path='/addmanager' element={ <AddManager/>}/>
          <Route path="/" element={ <Home/>}/>
          <Route path="/login" element={ <Login/>}/>
          <Route path="/viewmanager" element={<ViewManager/>}/>
          <Route path="/ownerhome" element={ <OwnerHome/>}/>
          <Route path="/add" element={ <Additems/>}/>
          <Route path="/updatepassword" element={ <UpdatePassword/>}/>
          <Route path="/about" element={ <About/>}/>
          <Route path="/order/addorder" element={<PlaceOrder/>} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path='/order-summary'element={<OrderSummary/>}/>
          <Route path='/order-success'element={<OrderSuccess/>}/>
          <Route path="/analytics" element={<AnalyticsPage/>}/>
          </Routes>
      </Router>

      </Elements>
    </>
    
  )
}

export default App
