import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/nav.css";
import white from "../images/white.svg";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="div">
        <h2 className="main">Focus - Online Book Store</h2>
        <img
          className="home"
          src={white}
          alt="home"
          style={{ width: "30px", height: "30px" }}
        />
        {/* write your code here */}
        <NavLink to='/' className='text'>Home</NavLink>
      </div>
    );
  }
}

export default Navbar;
