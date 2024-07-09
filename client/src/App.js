import React, { useEffect } from "react";
import "./App.css";
import AppName from "./components/AppName";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyerLoginSignup from "./pages/Buyer Log Sign";
import BuyerHomePage from "./pages/Buyer Home Page";
import BuyerShopView from "./pages/Buyer Shop View";
import BuyNowButton from "./components/Buy Now Button";
import CreatorShopView from "./pages/Creator Shop View";
import Cart from "./pages/Cart";
import UpdateContentForm from "./pages/Edit Content Page";
import NewContentForm from "./pages/New Content form";
import Login from "./components/Login";
import CreatorSignUp from "./components/Creator/CSignUp";
import BSignUp from "./components/Buyer/BSignUp";
import { useNavigate } from "react-router-dom";
import BLogin from "./components/Buyer/BLogin";
import Clogin from "./components/Creator/Clogin";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppName />
        <Routes>
          <Route
            path="/shop/:creator_id"
            element={<LoggedInBuyerRouter Component={BuyerShopView} />}
          />
          <Route
            path="/mycart"
            element={<LoggedInBuyerRouter Component={Cart} />}
          />
          <Route path="/login-signup" element={<BuyerLoginSignup />} />

          <Route
            path="/"
            element={<LoggedInBuyerRouter Component={BuyerHomePage} />}
          />
          <Route path="/buyer/login" element={<BLogin />} />
          <Route path="/creator/login" element={<Clogin />} />
          <Route path="/creator/signup" element={<CreatorSignUp />} />
          <Route path="/buyer/signup" element={<BSignUp />} />
          <Route
            path="/myshop/update-content/:content_id"
            element={<LoggedInCreatorRoutes Component={UpdateContentForm} />}
          />
          <Route
            path="/myshop/:creator_id"
            element={<LoggedInCreatorRoutes Component={CreatorShopView} />}
          />

          <Route
            path="/myshop/new/:creator_id"
            element={<LoggedInCreatorRoutes Component={NewContentForm} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function LoggedInBuyerRouter({ Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    const userSession = window.sessionStorage["userId"];
    if (!userSession) {
      navigate("/buyer/login");
      return;
    }
    const user = JSON.parse(userSession);
    if (!user.buyerId) {
      navigate("/buyer/login");
    }
  }, []);
  return <React.Fragment>{<Component />}</React.Fragment>;
}

function LoggedInCreatorRoutes({ Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    const userSession = window.sessionStorage["userId"];
    if (!userSession) {
      navigate("/creator/login");
      return;
    }
    const user = JSON.parse(userSession);
    if (!user.creatorId) {
      navigate("/creator/login");
    }
  }, []);
  return <React.Fragment>{<Component />}</React.Fragment>;
}

export default App;
