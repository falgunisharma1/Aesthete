import React from "react";
import "./App.css";
import AppName from "./components/AppName";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyerLoginSignup from "./pages/Buyer Log Sign";
import BuyerHomePage from "./pages/Buyer Home Page";
import ShopView from "./components/Shop View";
import BuyerShopView from "./pages/Buyer Shop View"
import BuyNowButton from "./components/Buy Now Button"
import CreatorShopView from "./pages/Creator Shop View"
import Cart from "./pages/Cart"
import UpdateContentForm from "./pages/Edit Content Page"

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppName />
        <Routes>
          <Route path="/login-signup" element={<BuyerLoginSignup />} />
          <Route path="/everything" element={<BuyerHomePage />} />
          <Route path="/myshop/:creator_id" element={<CreatorShopView />} />
          <Route path="/shop/:creator_id" element={<BuyerShopView/>}/>
          <Route path="/mycart" element={<Cart/>}/>
          <Route path="/shop/update-content/:content_id" element={<UpdateContentForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
