import React from "react";
import "./App.css";
import AppName from "./components/AppName";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyerLoginSignup from "./pages/Buyer Log Sign";
import BuyerHomePage from "./pages/Buyer Home Page";
import CreatorShop from "./pages/Creator Shop";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppName />
        <Routes>
          <Route path="/login-signup" element={<BuyerLoginSignup />} />
          <Route path="/everything" element={<BuyerHomePage />} />
          <Route path="/shop/:creatorid" element={<CreatorShop />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
