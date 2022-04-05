import React, { Component } from "react";
import book from "../images/poster.jpg";
import Navbar from "./nav";
import Footer from "./footer";

class Fiction extends Component {
  state = {
    book:[
      {id: 1 , name: "Revolution 2020" , author: "Savi Sharma", img: book},
      {id: 2 , name: "Half GirlFriend" , author: "Chetan Bhagat", img: book},
      {id: 3 , name: "2 States" , author: "Chetan Bhagat", img: book},
      {id: 4 , name: "One Night At The Center" , author: "Chetan Bhagat", img: book}
    ]
  };
  render() {
    return (
      <div>
        <Navbar />
        <p className="head">Fiction Books</p>
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

export default Fiction;
