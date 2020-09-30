import React from 'react';

class Joke extends React.Component {
  render(){
    return(
      <div>
        <div className="Joke-buttons">
          <button>Up</button>
          <span>{this.props.votes}</span>
          <button>Down</button>
        </div>
        <div className="Joke-text">
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Joke;