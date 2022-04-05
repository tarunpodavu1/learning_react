import React, { Component } from "react";
import "./modal.css";

const backdropStyle = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundcolor: "rgba(0,0,0,0)",
  padding: 50,
  overflow: "auto",
};

const modalStyle = {
  backgroundColor: "white",
  maxWidth: 350,
  minHeight: "auto",
  margin: "0 auto",
  padding: 30,
  position: "relative",
};

class Modal extends Component {
  render() {
    return (
      <div style={backdropStyle} className="wrapper1">
        <div style={modalStyle} className="form">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
