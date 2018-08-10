import React from 'react';
import PropTypes from 'prop-types';

import DragWarp from './dragWarp';


export default class Drag extends React.Component {
  static tem = DragWarp

  static propTypes = {
    children: PropTypes.any,
  };

  static defaultProps = {
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    const {
      children,
    } = props;

    this.children = children;
  }

  render() {
    console.log(this.children);
    return (
      this.children
    );
  }
}
