import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import { v4 as uuid } from 'uuid';

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
    this.handleVote = this.handleVote.bind(this);
  };

  async componentDidMount() {
    // Load jokes
    let jokesArr = [];
    while(jokesArr.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      jokesArr.push({id: uuid(), text: res.data.joke, votes: 0});
    }
    this.setState({ jokes: jokesArr })
  };

  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j => 
          j.id === id ? {...j, votes: j.votes + delta} : j)   
      })
    )
  }

  render(){
    return(
      <div className='JokeList'>
        <h1>DAD JOKES</h1>
        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <Joke
              key={j.id}
              text={j.text}
              votes={j.votes}   
              upVote={() => this.handleVote(j.id, 1)}
              downVote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList;