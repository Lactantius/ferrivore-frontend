import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./NavBar.css";

function NavBar({ user, logout }: NavBarProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="NavBar">
      <NavLink className="NavBar-logo" to="/">
        Ferrivore
      </NavLink>
      <div className="NavBar-desktop">
        {user ? (
          <>
            <NavLink to="/ideas" className="push">
              <LightbulbOutlinedIcon />
              History
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
      </div>
      <div className="NavBar-mobile">
        <button
          className="NavBar-button"
          id="menu-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
          Menu
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "menu-button",
          }}
        >
          {user ? (
            <>
              <MenuItem onClick={handleClose}>
                <NavLink to="/ideas" className="push">
                  <LightbulbOutlinedIcon />
                  History
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/new">
                  <AddCircleOutlineIcon />
                  New
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/profile">
                  <AccountCircleOutlinedIcon />
                  Profile
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/" onClick={(e: React.MouseEvent) => logout()}>
                  <LogoutIcon />
                  Logout
                </NavLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleClose}>
                <NavLink to="/login" className="push">
                  <LoginIcon />
                  Login
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/signup">
                  <PersonAddAltOutlinedIcon />
                  Sign up
                </NavLink>
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    </nav>
  );
}

export default NavBar;
