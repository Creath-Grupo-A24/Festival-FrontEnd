import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./logo.png";
// Components
import Home from './app/home/home.page';
import FestivalDetails from './components/festivalDetails';
import Subscription from './components/eventSub';
import EventCreate from './components/eventCreate';
import CreateCompany from './userArea/createCompany';
import SubscriptionArea from './userArea/subscriptionsArea';
import Details from './userArea/detailsSubs';
import UploadForm from './rules/uploadRules';
import LoginPage from "./app/auth/login/login.page";
import { AuthServiceFactory } from "./services/auth.service";

function App() {
  const [user, setUser] = useState(null);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    AuthServiceFactory.create().getUser().then((user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });

  }, []);


  return (
    <div className="app-container">
      <div className="app-header-container">
        <div className="app-header-logo">
          <Link to={"/"}>
            <img
              src={logo}
              className="app-logo"
              alt="logo"
            />
          </Link>
        </div>
        <nav className="app-header-content">
          <div className="nav-links">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to={user ? "/profile" : "/signin"}>Área usuário</Link>
          </div>
        </nav>

      </div>

      <main className="app-content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoginPage />} />
          
          <Route path="/festival/:id" element={<FestivalDetails />} />
          <Route path='/inscricao/:id' element={<Subscription />} />
          <Route path='/create' element={<EventCreate />} />
          <Route path="/userarea" element={<div></div>}>
            <Route path="data" element={<div></div>} />
            <Route path="createcompany" element={<CreateCompany />} />
            <Route path='subscriptionlist' element={<SubscriptionArea />} />
            <Route path='details' element={<Details />} />
          </Route>
          <Route path='uprules' element={<UploadForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
