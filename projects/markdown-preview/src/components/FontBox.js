import React, { Component } from 'react';

class FontBox extends Component {
  render() {
    return (
      <div className="button-group">
        <button type="button"
          onClick={this.props.font.bind(null, 'roboto')}>
          Roboto
        </button>
        <button type="button"
          onClick={this.props.font.bind(null, 'open-sans')}>
          Open Sans
        </button>
        <button type="button"
          onClick={this.props.font.bind(null, 'cursive')}>Indie Flower
        </button>
      </div>
    );
  }
}

export default FontBox;
