import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

function NavBar({ user, logout }: NavBarProps): JSX.Element {
  return (
    <nav className="NavBar">
      <NavLink to="/">Ferrivore</NavLink>
      {user ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/" onClick={(e: React.MouseEvent) => logout()}>
            Logout
          </NavLink>
          <NavLink to="/ideas">Ideas</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
