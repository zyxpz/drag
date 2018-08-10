/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Drag } from './src';


const Item = Drag.item;

const styles = {
  dragWarp: {
    width: '200px',
    height: '100px',
    border: 'solid 1px blue',
    textAlign: 'center',
  },
  li: {
    marginRight: '6px',
  },
  drop: {
    width: '200px',
    height: '100px',
    border: 'solid 1px blue',
  },
};

const dragData = [1, 2, 3, 4];

render(
  <Drag
    dragWarp="drag"
  >

    <div>
      <div className="drag" style={{ ...styles.dragWarp }}>
        {
          dragData.map((item, i) => (
            <span key={i} style={{ ...styles.li }}>
              {item}
            </span>
          ))
        }
      </div>
      {/* <div className="drop" style={{ ...styles.drop }} /> */}
      <Item
        className="drop"
      />
    </div>
  </Drag>,
  document.querySelector('.app'),
);
