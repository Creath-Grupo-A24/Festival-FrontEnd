import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// Components
import Home from "./app/home/home.page";
import FestivalDetails from "./components/festivalDetails";
import Subscription from "./components/eventSub";
import EventCreate from "./app/event/create/event-create.page";
import CreateCompany from "./app/company/create/create-company.page";
import SubscriptionArea from "./userArea/subscriptionsArea";
import Details from "./userArea/detailsSubs";
import UploadForm from "./components/event/rules/upload-rules.component";
import LoginPage from "./app/auth/login/login.page";
import Header from "./components/header/header.component";
import Cookies from "js-cookie";
import Footer from "./components/footer/footer.component";
import RegisterPage from "./app/auth/register/register.page";
import Profile from "./app/profile/profile.page";
import { AuthServiceFactory } from "./services/auth.service";
import InviteComponent from "./userArea/inviteComponent";
import ViewCompany from "./app/company/view/view-company.page";
import { CompanyServiceFactory } from "./services/company.service";

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
          const company = await CompanyServiceFactory.create().getCompany(
            user.company_id
          );
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
          <Route path="/inscricao/:id" element={<Subscription company={company}/>} />
          <Route path="/event/create" element={<EventCreate />} />
          <Route
            path="/profile"
            element={<Profile user={user} company={company} />}
          >
            <Route path="subscriptionlist" element={<SubscriptionArea />} />
            <Route path="details" element={<Details />} />
          </Route>
          <Route
            path="/company"
            element={<ViewCompany user={user} company={company} />}
          ></Route>
          <Route path="/company/invite" element={<InviteComponent company={company} />} />
          <Route
            path="/company/create"
            element={
              <CreateCompany
                user={user}
                setUser={setUser}
                company={company}
                setCompany={setCompany}
              />
            }
          />
          <Route path="/event/rules/upload" element={<UploadForm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
