import React from "react";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CodeIcon from "@mui/icons-material/Code";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";

import "./Footer.css";
import { ReactComponent as Neo4jLogo } from "./Neo4j-logo-white.svg";

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
      <a href="https://neo4j.com">
        Powered by <Neo4jLogo className="Footer-Neo4jLogo" />
      </a>
    </div>
  );
}

export default Footer;
