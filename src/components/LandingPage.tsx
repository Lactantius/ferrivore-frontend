import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import "./LandingPage.css";

function LandingPage (): JSX.Element {
  return (
    <div className="LandingPage">
      <h1>Ferrivore</h1>
      <h2>An idea discovery tool</h2>
      <p>
        Ferrivore recommends ideas based on <i>quality</i>, not just who said
        them or whether you'll agree. <Link to="/about">Learn more</Link>.
      </p>
      <div className="LandingPage-buttons">
        <Button
          variant="contained"
          size="large"
          href="/login"
          startIcon={<LoginIcon />}
        >
          Log in
        </Button>
        <Button
          variant="contained"
          size="large"
          href="/signup"
          startIcon={<PersonAddAltOutlinedIcon />}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
