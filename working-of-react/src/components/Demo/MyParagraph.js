import React from "react";

const MyParagraph = (props) => {
  console.log("MyParagraph is RUNNING");
  return <p>{props.children}</p>;
};

export default MyParagraph;
