import { React, useState } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/home';
import About from './components/About/about';
import Service from './components/Service/service';
import Menu from './components/Menu/menu';
import Contact from './components/Contact/contact';
import Testimonial from './components/Testimonial/testimonial';
import Team from './components/Team/team'
import Booking from './components/Booking/booking'
import Cart from './components/Cart/cart';
import { CartProvider } from "react-use-cart";
import Login from './components/Admin/Login/login';
import Dashboard from './components/Admin/Dashboard/dashboard'
import Protected from './components/Protected'
import Checkout from '../src/components/Cart/checkout';
import Order from '../src/components/Cart/order';

function App() {

  const [isSignedIn] = useState(() => {
    const userLogged = localStorage.getItem("access_token");
    return userLogged || false;
  });

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/testimonial' element={<Testimonial />} />
          <Route path='/team' element={<Team />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order' element={<Order />} />
          <Route path='/login' element={<Login />} />
          <Route path="/dashboard" element={<Protected isSignedIn={isSignedIn}><Dashboard /></Protected>} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App;
