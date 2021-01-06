import React, {useContext} from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";
// TODO-- ADD LOGIC SO PROFILE ONLY APPEARS WHEN LOGGED IN
function NavBar({logout}) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedOutNav() {
    return (
      <Navbar>
        Welcome to Jobly!
        <NavItem>
            <NavLink to="/login">Login</NavLink>
        </NavItem>
        <NavItem>
            <NavLink to="/signup">Signup</NavLink>
        </NavItem>
      </Navbar>
    )
  }

function loggedInNav() {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
         Welcome {currentUser.username}!
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
          <Link className="nav-link" to="/" onClick={logout}>
              Log out {currentUser.first_name || currentUser.username}
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );}

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
);
}

export default NavBar;