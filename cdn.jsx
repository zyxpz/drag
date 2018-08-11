/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Drag } from './src';

const styles = {
  dragWarp: {
    width: '200px',
    height: '100px',
    border: 'solid 1px blue',
  },
  li: {
    width: '40px',
    height: '100%',
    display: 'inline-block',
    textAlign: 'center',
    border: 'solid 1px black',
  },
  drop: {
    width: '400px',
    height: '200px',
    border: 'solid 1px blue',
  },
};

const dragData = [1, 2, 3, 4];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.option = {
      dragWarp: {
        dragData: [
          { text: 1 },
          { text: 2 },
          { text: 3 },
          { text: 4 },
        ],
        classNames: 'dragWarp',
        styles: { display: 'inline-block' },
        render: data => (
          <span
            style={{ ...styles.li }}
            draggable
          >
            {data.data.text}
          </span>
        ),
      },
      dropWarp: {
        classNames: 'dropWarp',
        styles: { ...styles.drop },
        render: data => (
          <span>
            {data.data.text}
          </span>
        ),
      },
    };
  }

  render() {
    return (
      <Drag
        Option={this.option}
        styles={{ ...styles.dragWarp }}
      />
    );
  }
}

render(
  <App />,
  document.querySelector('.app'),
);
