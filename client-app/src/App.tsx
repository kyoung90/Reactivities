import React, {Component} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component{
  state = {
    values: []
  }

  componentDidMount(){
    axios.get("http://localhost:5000/api/values")
      .then((response) => {
        this.setState({
          values: response.data
        })
      })
    
  }

  render(){
    return (
      <div className="App">
        <ul>
          {this.state.values.map((value: any) => <li>{value.name}</li>)}
        </ul>
      </div>
    );
  }
  
}

export default App;
