import React from 'react';
import PropTypes from 'prop-types';


export default class DragWarp extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: '',
    style: '',
  }

  static defaultProps = {
    children: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.string,
  }

  constructor(props) {
    super(props);

    const {
      children,
      className,
      style,
    } = props;
    this.children = children;

    this.className = className;

    this.style = style;
  }

  render() {
    return (
      <div className={this.className} style={this.style} />
    );
  }
}
