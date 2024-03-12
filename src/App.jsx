import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductoDetalle from './components/ProductoDetalle';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Cart from './components/Cart'
import Products from './components/Products';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;