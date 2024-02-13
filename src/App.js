import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// Components
import Home from "./app/home/home.page";
import FestivalDetails from "./components/festivalDetails";
import Subscription from "./components/eventSub";
import EventCreate from "./components/eventCreate";
import CreateCompany from "./userArea/createCompany";
import SubscriptionArea from "./userArea/subscriptionsArea";
import Details from "./userArea/detailsSubs";
import UploadForm from "./rules/uploadRules";
import LoginPage from "./app/auth/login/login.page";
import Header from "./components/header/header";
import Cookies from "js-cookie";
import Footer from "./components/footer/footer";
import RegisterPage from "./app/auth/register/register.page";
import Profile from "./app/profile/profile.page";
import { AuthServiceFactory } from "./services/auth.service";

function App() {
  const [existsUser, setExistsUser] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (Cookies.get("token")) {
      setExistsUser(true);
      const fetchUser = async () => {
        const user = await AuthServiceFactory.create().getUser();
        setUser(user);
      };
      fetchUser();
    } else {
      setExistsUser(false);
      setUser(null);
    }
  }, []);

  return (
    <div className="app-container">
      <Header
        existsUser={existsUser}
        setExistsUser={setExistsUser}
        user={user}
      />

      <main className="app-content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={
              <LoginPage setExistsUser={setExistsUser} setUser={setUser} />
            }
          />
          <Route
            path="/signup"
            element={
              <RegisterPage setExistsUser={setExistsUser} setUser={setUser} />
            }
          />
          <Route path="/festival/:id" element={<FestivalDetails />} />
          <Route path="/inscricao/:id" element={<Subscription />} />
          <Route path="/create" element={<EventCreate />} />
          <Route path="/profile" element={<Profile user={user} />}>
            <Route path="data" element={<div></div>} />
            <Route path="createcompany" element={<CreateCompany />} />
            <Route path="subscriptionlist" element={<SubscriptionArea />} />
            <Route path="details" element={<Details />} />
          </Route>
          <Route path="uprules" element={<UploadForm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
