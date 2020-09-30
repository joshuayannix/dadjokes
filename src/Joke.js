import React from 'react';

class Joke extends React.Component {
  render(){
    return(
      <div>
        <div className="Joke-buttons">
          <button onClick={this.props.upVote}>Up</button>
          <span>{this.props.votes}</span>
          <button onClick={this.props.downVote}>Down</button>
        </div>
        <div className="Joke-text">
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Joke;