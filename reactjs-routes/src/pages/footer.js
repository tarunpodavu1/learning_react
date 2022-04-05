import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/footer.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="footer">
        {/* write your code here */}
        <NavLink className='link' to='/education'>Educational Books</NavLink>
        <NavLink className='link1' to='/fiction'>Fiction</NavLink>
      </div>
    );
  }
}

export default Footer;
