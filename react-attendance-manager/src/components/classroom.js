import React, { Component } from "react";
import { studentInfo } from "./data";

export class Classroom extends Component {
  //studentInfo is the list of student details in data.js
  state = {
    student: studentInfo,
    absentList: [],
  };
  handleClick = (id) => {
    //handleClick is best place to change the status property of student based on id
    // console.log(id);
    const {student} = this.state;
    const newStudent = [...student]
    newStudent.map((stu) => {
        if(stu.id === id+1)
            stu.status = 'clicked'
    }) 
    // console.log(newStudent);

    this.setState({...this.state, student: newStudent})
    
  };
  handleAttendance = () => {
    //set the list of absentees to the absentList state. filter student state based on the status property.
   const {student, absentList} = this.state;
  const newAbsentees = student.filter(stu => stu.status==='init')
//   console.log(newAbsentees);
  this.setState({...this.state, absentList: newAbsentees})

  };
  render() {


    //display the cards by mapping into the student
    const student = this.state.student.map((stu, i) => {
      return (
        <div
          style={{ padding: 5 }}
          className={stu.status}
          id="students"
          key={i}
          onClick={() => this.handleClick(i)}
        >
          {stu.type}{stu.id}
        </div>
      );
    });


    //display the students' id by mapping into absentList
    const absentees = this.state.absentList.map((stu, i) => {
      return <div className="absentees" key={i}>{
        stu.id
      }</div>;
    });



    return (
      <div>
        <div className="content">
          <h1 className="title" style={{ textAlign: "center", color: "blue" }}>
          Digital Attendance Sheet
          </h1>

          <div className="main">{
              student
          }</div>
          <div className="vertical"></div>

          <button className="list1" onClick={this.handleAttendance}>
          Take Attendance
          </button>
        </div>
        <h3 className="text">
        List of absentees
        </h3>

        <div className="list">
          <h2 className="absenteesList">{
            absentees
          }</h2>
        </div>
      </div>
    );
  }
}

export default Classroom;
