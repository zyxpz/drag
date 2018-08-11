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
        styles: { ...styles.dragWarp },
        render: (data, key) => {
          console.log(data);
          return (
            <span
              style={{ ...styles.li }}
              draggable
              key={key}
            >
              {data.data.text}
            </span>
          );
        },
      },
      dropWarp: {
        classNames: 'dropWarp',
        styles: { ...styles.drop },
        render: () => (
          <div />
        ),
      },
    };
  }

  render() {
    return (
      <Drag
        Option={this.option}
      />
    );
  }
}

render(
  <App />,
  document.querySelector('.app'),
);
