import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1>MOVIE-TOPIA!</h1>
      </Link>
      <Link to="/new" className="link-btn">
        New Movie
      </Link>
    </header>
  );
}

