import React, { Component } from 'react'
import CitiesList from './CitiesList'
import ReactDOM from 'react-dom'
import './App.css';

class App extends Component {



constructor(props) {
        super(props)
        this.state = {newValue:0}

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleValueChange=this.handleValueChange.bind(this);
    }

  add(txt1,txt2) {
    this.setState(prevState => ({
      values: [
      ...prevState.values,
      {
          id: this.nextID(),
          keyword: txt1,
          rank: txt2
          
      }]
    }))
  }

  handleValueChange(event){
    this.setState({newValue: event.target.value})
  }

    handleSubmit(event){
        event.preventDefault();
        let newValue = this.state.newValue;
        console.log("newValue: " + newValue);
        
        (async () => {
          const rawResponse = await fetch('https://franceproject.herokuapp.com/getData/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({keyword:newValue})
          });
            const content = await rawResponse.json();
            console.log("content: " + content);
            ReactDOM.render(<CitiesList values={content} />, document.getElementById("response"))
        })();
    }


    render() {
        return (
            <div>
                <form action="https://franceproject.herokuapp.com/getData/" method="POST" onSubmit={this.handleSubmit}>
                  <label>
                    Search:
                    <input onChange={this.handleValueChange} value={this.state.newValue} type="text" name="keyword" />                  
                  </label>
                  <input type="submit" value="Send" />
                </form>
                <div id="response">
                </div>
            </div>
        )
    }
}

export default App;
