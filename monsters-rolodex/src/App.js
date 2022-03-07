import { Component } from "react";

class App extends Component{
  constructor(){
    super();

    this.state = {
      name: 'Yihua'
    }
  }

  render(){
    return (
      <div className="App">
        <h1>Hello {this.state.name}</h1>
        <button onClick={() => {
          this.state.name='Tarun';
          console.log(this.state);
        }}>Change name</button>
      </div>
    );
  }
  
}

export default App;
