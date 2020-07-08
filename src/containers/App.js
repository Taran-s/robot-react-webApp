import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary'


class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: '',
      bgcolor1: '#071B52',
      bgcolor2: '#008080'
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { this.setState({ robots: users }) });
  }
  componentDidUpdate(){
    let taran=`linear-gradient(to right, ${this.state.bgcolor1}, ${this.state.bgcolor2}`
    document.body.style.background = taran;
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }
  onBgChange1 = (event) => {
    this.setState({ bgcolor1: event.target.value })
   
  }
  onBgChange2 = (event) => {
    this.setState({ bgcolor2: event.target.value })
   
  }
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc' >
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          
           <Scroll >
            <input type='color' value='#00ff00' className='dim ' onChange={this.onBgChange1}></input>
            <input type='color' value='#ff0000' onChange={this.onBgChange2}></input>
            <h3 className='tc' ></h3>
            <ErrorBoundary>
            
              <CardList robots={filteredRobots} />
            </ErrorBoundary>

          </Scroll>
           
          
        </div>
      );
  }
}

export default App;