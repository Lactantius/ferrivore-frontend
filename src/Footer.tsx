import React from "react";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CodeIcon from "@mui/icons-material/Code";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";

import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <Link to="/about">
        <InfoOutlinedIcon />
        About
      </Link>
      <a href="https://gerardkeiser.com/contact">
        <ContactPageOutlinedIcon />
        Contact
      </a>
      <a href="https://github.com/Lactantius/ferrivore">
        <CodeIcon />
        Source
      </a>
    </div>
  );
}

export default Footer;