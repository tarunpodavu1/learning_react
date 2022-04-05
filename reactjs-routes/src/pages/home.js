import React, { Component } from "react";
import book from "../images/poster.jpg";
import Navbar from "./nav";
import Footer from "./footer";
import "../css/home.css";

class Home extends Component {
  state = {
    book:[
      {id: 1 , name: "Stories We Never Tell" , author: "Savi Sharma", img: book},
      {id: 2 , name: "The Alchemist" , author: "Paulo Coelho", img: book},
      {id: 3 , name: "The Prophet" , author: "Kahlil Gibran", img: book},
      {id: 4 , name: "The Blue Umbrella" , author: "Ruskin Bond", img: book}
    ]
  };
  render() {
    return (
      <div>
        <Navbar />
        <p className="head">Most Read Books</p>
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

export default Home;
