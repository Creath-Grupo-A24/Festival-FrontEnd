import { Link } from "react-router-dom";
import UserDropdown from "./user-dropdown.component";
import "./header.css";

function Header({ existsUser, setExistsUser, setUser, user, setCompany }) {
  return (
    <header className="app-header-container">
      <div className="app-header-logo">
        <Link to={"/"}>
          <img
            src="/logo.png"
            className="app-logo"
            alt="logo"
          />
        </Link>
      </div>
      <nav className="app-header-content">
        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to={existsUser ? "/profile" : "/signin"}>
            Profile
          </Link>
          {user && user.roles.includes("MANAGER") &&
            < Link className="nav-link" to="/company">
              Company
            </Link>}
          {user && user.roles.includes("ADMIN") &&
            (<Link className="nav-link" to="/event/create">
              Event
            </Link>)}
        </div>
      </nav>

      {
        existsUser && (
          <UserDropdown
            setExistsUser={setExistsUser}
            setUser={setUser}
            setCompany={setCompany}
          />
        )
      }
    </header >
  )
}

export default Header;