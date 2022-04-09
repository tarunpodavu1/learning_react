import React, { Component } from "react";
import Modal from "./modal";
import { Data } from "./data";

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      tables: Data,
      email: "",
      phone: "",
      reservedId: undefined,
    };
  }


  showModal =  (i) => {
      // const {showModal} = this.state
      this.setState((prevState) => ({
        ...prevState,
        showModal: !prevState.showModal,
        reservedId: i,
      }))
      // console.log(this.state);
      // console.log(i);
  };
  handleSubmit = (e, id) => {
      e.preventDefault()
      const [email, phone] = e.target
      // console.log(e, id);
      console.log(email.value, phone.value);
      const {reservedId, tables, showModal} = this.state
      const newTable = [...tables]
      // console.log(tables);
      console.log(newTable);
      const filterTable = newTable.map(table => {
        if(table.id === reservedId) 
         return table.status='reserved'
        else {
          return table
        }
        
        }
        )
      console.log(filterTable);
      this.setState((prevState) => ({
        ...prevState,
        email: email.value,
        phone: phone.value,
        showModal: !showModal
      }))

      console.log(this.state);


      alert("Registration successful. We are waiting for your presence here.")

      this.clearValues()


  };

  emailHandler = (e) => {
    this.setState({...this.state, email: e.target.value})
  }
  phoneHandler = (e) => {
    this.setState({...this.state, phone: e.target.value})
  }

  clearValues = () => {
    this.setState((prevState) => ({
      ...prevState,
      email: '',
      phone: '',
      // reservedId:''
    }))
  }

  render() {
    //populate the page by mapping tables
    let tableList = this.state.tables.map((table) => {
      return (
        <div className="card" id="image" key={table.id}>
          <ul>
            <li className="list">
              <img onClick={() => this.showModal(table.id)} src={table.src} width="75%" height="75%" alt="" />
              {table.status === 'reserved' && <h2><span>Table Reserved</span></h2>}
            </li>
          </ul>
        </div>
      );
    });




    return (
      <div className="container">
        <div className="table_list">
          {tableList}
          {this.state.showModal && (
            <Modal show={this.state.showModal}>
              <div className="center">
                <button className="close" onClick={() => this.showModal()}>X</button>
              </div>
              <br />
              <h4 className="text">
              You are booking table for Tomorrow
              </h4>
              <form onSubmit={this.handleSubmit}>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" onChange={this.emailHandler} value={this.state.email}/>
                </div>
                <div className="phone">
                  <label htmlFor="phone">Phone</label>
                  <input type="phone" name="phone" onChange={this.phoneHandler} value={this.state.phone}/>
                </div>
                <br />

                <div className="submit">
                  <button className="btn">Reserve</button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default Restaurant;
