import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import Header from "./components/header/header";
import Cookies from "js-cookie";
import Footer from "./components/footer/footer";
import RegisterPage from "./app/auth/register/register.page";
import Profile from "./userArea/userArea";
import ProfileData from "./userArea/userData";
import InviteComponent from "./userArea/inviteComponent";

function App() {
  const [existsUser, setExistsUser] = useState(false);

  useEffect(() => {
      Cookies.get("token") ? setExistsUser(true) : setExistsUser(false);
  }, []);

  return (
    <div className="app-container">
      <Header existsUser={existsUser} setExistsUser={setExistsUser} />

      <main className="app-content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoginPage setExistsUser={setExistsUser} />} />
          <Route path="/signup" element={<RegisterPage setExistsUser={setExistsUser} />} />
          <Route path="/festival/:id" element={<FestivalDetails />} />
          <Route path='/inscricao/:id' element={<Subscription />} />
          <Route path="/profile" element={<Profile/>}>
            <Route path='create' element={<EventCreate />} />
            <Route path="data" element={<ProfileData/>} />
            <Route path="createcompany" element={<CreateCompany />} />
            <Route path='subscriptionlist' element={<SubscriptionArea />} />
            <Route path='details' element={<Details />} />
            <Route path='invite' element={<InviteComponent />} />
          </Route>
          <Route path='uprules' element={<UploadForm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
