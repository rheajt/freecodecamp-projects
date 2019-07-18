import React, { Component } from 'react';
import marked from 'marked';

import FontBox from './FontBox.js';

class MarkdownBox extends Component {

  constructor() {
    super();
    this.state = {
      value: 'Type some *markdown* here!\n\r' +
        '# this is a title line\n\r' +
        '## this is another title\n\r' +
        '### another header\n\r' +
      '* to create a bulletted line\n\r',
      font: 'open-sans'
    }
  }

  handleChange() {

    this.setState({
      value: this.refs.textarea.value
    });
  }

  rawMarkup() {
    return {
      __html: marked(this.state.value, {
        gfm: true,
        sanitize: true
      })
    };
  }

  changeFont(font) {
    this.setState({
      font: font
    });
  }

  render() {
    return (
      <div>
        <div className="column">
          <textarea ref="textarea" defaultValue={this.state.value} onChange={this.handleChange.bind(this)} />
          <FontBox font={this.changeFont.bind(this)} active={this.state.font} />
        </div>
        <div className={"column results " + this.state.font} dangerouslySetInnerHTML={this.rawMarkup()}></div>
      </div>
    )
  }
}

export default MarkdownBox;
