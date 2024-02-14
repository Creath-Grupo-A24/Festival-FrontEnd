import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// Components
import Home from "./app/home/home.page";
import FestivalDetails from "./components/festivalDetails";
import Subscription from "./components/eventSub";
import EventCreate from "./components/eventCreate";
import CreateCompany from "./userArea/company/create/createCompany";
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
import { getCompany } from "./userArea/areaService";
import InviteComponent from "./userArea/inviteComponent";

function App() {
  const [existsUser, setExistsUser] = useState(false);
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (Cookies.get("token")) {
      setExistsUser(true);
      const fetchUser = async () => {
        const user = await AuthServiceFactory.create().getUser();
        setUser(user);
        if (user.company_id != null) {
          const company = await getCompany(user.company_id);
          setCompany(company);
        }
      };
      fetchUser();
    } else {
      setExistsUser(false);
      setUser(null);
    }
    Cookies.get("token") ? setExistsUser(true) : setExistsUser(false);
  }, []);

  return (
    <div className="app-container">
      <Header
        existsUser={existsUser}
        setExistsUser={setExistsUser}
        setUser={setUser}
        user={user}
        setCompany={setCompany}
      />

      <main className="app-content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={
              <LoginPage
                setExistsUser={setExistsUser}
                setUser={setUser}
                setCompany={setCompany}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <RegisterPage
                setExistsUser={setExistsUser}
                setUser={setUser}
                setCompany={setCompany}
              />
            }
          />
          <Route path="/festival/:id" element={<FestivalDetails />} />
          <Route path="/inscricao/:id" element={<Subscription />} />
          <Route path="/create" element={<EventCreate />} />
          <Route path="/inscricao/:id" element={<Subscription />} />
          <Route
            path="/profile"
            element={<Profile user={user} company={company} />}
          >
            <Route path="create" element={<EventCreate />} />
            <Route path="subscriptionlist" element={<SubscriptionArea />} />
            <Route path="details" element={<Details />} />
            <Route path="invite" element={<InviteComponent />} />
          </Route>
          <Route
            path="/companycreate"
            element={
              <CreateCompany user={user} setUser={setUser} company={company} />
            }
          />
          <Route path="uprules" element={<UploadForm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
