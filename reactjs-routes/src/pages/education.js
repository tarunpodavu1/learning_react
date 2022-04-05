import React, { Component } from "react";
import book from "../images/poster.jpg";
import Navbar from "./nav";
import Footer from "./footer";

class Education extends Component {
  state = {
    book:[
      {id: 1 , name: "Polity Tricks" , author: "Dr. Vinay Bansal", img: book},
      {id: 2 , name: "Objective General English" , author: "S.P. Bakshi", img: book},
      {id: 3 , name: "Fast Track Arithmetic" , author: "Kahlil Gibran", img: book},
      {id: 4 , name: "Quantitative Reasoning" , author: "Ruskin Bond", img: book}
    ]
  };
  render() {
    return (
      <div>
        <Navbar />
        <p className="head">Educational Books</p>
        <div className="hcard">
          {this.state.book.map((data , id) =>(
            <div key={id} className="card">
              <img className="book" src={data.img} alt="book" style={{ width: "200px", height: "200px" }} />
              <p>{data.name}</p>
              <p>{data.author}</p>
            </div>
          ))}
        </div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default Education;
