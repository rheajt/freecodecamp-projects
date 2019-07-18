import React, { Component } from 'react';

import Header from './components/Header';
import MarkdownBox from './components/MarkdownBox';

class App extends Component {
  render() {
    return (
      <div className="grid">
        <Header />
        <MarkdownBox />
      </div>
    );
  }
}

export default App;
