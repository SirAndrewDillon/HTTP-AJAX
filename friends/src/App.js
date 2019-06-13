import React, { Component } from 'react';
import axios from 'axios';

import FriendsList from './components/FriendPage';
import NewFriend from './components/Friends';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      friend: {
        name: '',
        age: '',
        email: ''
      }
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/friends')
      .then(response => this.setState({ friends: response.data }))
      .catch(err => console.log(err));
  }

  handleSetData = data => this.setState({ friends: data })

  handleChange = e => {
    this.setState({
      friend: {
        ...this.state.friend,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSubmitNewFriend = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/friends', this.state.friend)
      .then(response => {
        this.setState({
          friends: response.data,
          friend: {
            name: '',
            age: '',
            email: ''
          }
        });
        console.log(response)
      })
      .catch(err => console.log(err));
  }

  handleDeleteFriend = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/friends/${id}`)
      .then(response => {
        this.setState({
          friends: response.data
        })
      })
      .catch(err => console.log(err));
  };

  render() {
    const { friends, friend } = this.state;
    return (
      <div className="App">
        <NewFriend
          newFriend={friend}
          handleChange={this.handleChange}
          submitNewFriend={this.handleSubmitNewFriend}
        />
        <FriendsList
          friends={friends}
          handleSetData={this.handleSetData}
          handleDeleteFriend={this.handleDeleteFriend}
        />
      </div>
    );
  }
}

export default App;