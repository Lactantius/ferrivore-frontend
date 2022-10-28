import React from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import "./NavBar.css";

function NavBar({ user, logout }: NavBarProps): JSX.Element {
  return (
    <nav className="NavBar">
      <NavLink to="/">Ferrivore</NavLink>
      {user ? (
        <>
          <NavLink to="/ideas" className="push">
            <LightbulbOutlinedIcon />
            Ideas
          </NavLink>
          <NavLink to="/new">
            <AddCircleOutlineIcon />
            New
          </NavLink>
          <NavLink to="/profile">
            <AccountCircleOutlinedIcon />
            Profile
          </NavLink>
          <NavLink to="/" onClick={(e: React.MouseEvent) => logout()}>
            <LogoutIcon />
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login" className="push">
            <LoginIcon />
            Login
          </NavLink>
          <NavLink to="/signup">
            <PersonAddAltOutlinedIcon />
            Sign up
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
