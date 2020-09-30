import React from 'react';
import axios from 'axios';
import Joke from './Joke';

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  };

  async componentDidMount() {
    // Load jokes
    let jokesArr = [];
    while(jokesArr.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      jokesArr.push({text: res.data.joke, votes: 0});
    }
    this.setState({ jokes: jokesArr })
  };


  render(){
    return(
      <div className='JokeList'>
        <h1>DAD JOKES</h1>
        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <Joke
              text={j.text}
              votes={j.votes}              
            />
          ))}
        </div>
      </div>
    )
  }
}

export default JokeList;