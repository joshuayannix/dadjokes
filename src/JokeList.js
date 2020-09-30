import React from 'react';
import axios from 'axios';

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
      jokesArr.push(res.data.joke);
    }
    this.setState({ jokes: jokesArr })
  };


  render(){
    return(
      <div>
        <h1>DAD JOKES</h1>
      </div>
    )
  }
}

export default JokeList;