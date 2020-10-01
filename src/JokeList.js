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
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false
    };
    this.handleClick = this.handleClick.bind(this);
  };

  componentDidMount() {
    if(this.state.jokes.length === 0){
      this.getJokes();
    }
  }

  async getJokes() {
    let jokesArr = [];
    while(jokesArr.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      jokesArr.push({id: uuid(), text: res.data.joke, votes: 0});
    }
    this.setState(
      st => ({
        loading: false,
        jokes: [...st.jokes, ...jokesArr]
      }),
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );

    window.localStorage.setItem('jokes', JSON.stringify(jokesArr));
  }; 


  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j => 
          j.id === id ? {...j, votes: j.votes + delta} : j)   
      }),
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({ loading: true }, this.getJokes);

  }

  render(){
    if(this.state.loading) {
      return (
        <div className="spinner">Loading...</div>
      )
    }
    return(
      <div className='JokeList'>
        <h1>DAD JOKES</h1>
        <div>
          <button onClick={this.handleClick}>Get More Jokes</button>
        </div>
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