import React, { createElement } from 'react';
import PropTypes from 'prop-types';

export default class Drag extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    Option: PropTypes.object,
    styles: PropTypes.object,
    classNames: PropTypes.string,
  };

  static defaultProps = {
    tag: 'div',
    Option: {},
    styles: {},
    classNames: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  /**
   * 拖拽开始
   */
  handleDragStart = (e, data) => {
    console.dir(data);
    e.dataTransfer.setData('text', data);
  }

  /**
   * 拖拽中
   */
  handleDragging = () => {
    console.log('正在拖动');
  }

  /**
   * 拖拽结束
   */
  handleDragEnd = (e) => {
    console.log('DragEnd ');
    e.dataTransfer.clearData('text');
  }

  /**
   * 阻止drop默认事件
   */
  handleDllowDrop = (e) => {
    e.preventDefault();
  }

  /**
   * 拖拽进drop
   */
  handleOnDrop = (e) => {
    console.log(e.dataTransfer.get('text'), 1111);
    const data = e.dataTransfer.get('text');
    const {
      list = [],
    } = this.state;
    const newList = list.push(data);
    this.setState({
      list: [
        ...list,
        newList,
      ],
    });
    console.log(list);
  }

  render() {
    // console.log(this.props);
    const {
      Option = {},
      tag: Tag,
      classNames = '',
      styles = {},
    } = this.props;

    const {
      list = [],
    } = this.state;

    return (
      <div>
        {
          Object.keys(Option).map((item, i) => {
            console.log(Option[item]);
            return Option[item].classNames === 'dragWarp' ? (
              <div
                className={classNames}
                style={styles}
                key={i}
              >
                {
                  Option[item].dragData.map((dItem, di) => {
                    console.log();
                    return (
                      <Tag
                        className={Option[item].classNames}
                        style={{ ...Option[item].styles }}
                        onClick={e => this.handleClick(e)}
                        key={di}
                        data={Option[item].dragData}
                        onDragStart={e => this.handleDragStart(e, dItem)}
                        onDragEnd={e => this.handleDragEnd(e)}
                      >
                        {
                          createElement(
                            Option[item].render,
                            {
                              data: dItem,
                            },
                          )
                        }
                      </Tag>
                    );
                  })
                }
              </div>
            )
              : (
                <div
                  key={i}
                >
                  {
                    list.length > 0 ? list.map((dpItem, dpI) => {
                      console.log(dpItem, dpI);
                      return (
                        <Tag
                          className={Option[item].classNames}
                          style={{ ...Option[item].styles }}
                          key={dpI}
                          data={Option[item].dragData}
                          onDrop={e => this.handleOnDrop(e)}
                        >
                          {
                            createElement(
                              Option[item].render,
                              { data: dpItem },
                            )
                          }
                        </Tag>
                      );
                    })
                      : (
                        <Tag
                          className={Option[item].classNames}
                          style={{ ...Option[item].styles }}
                          data={Option[item].dragData}
                          onDrop={e => this.handleOnDrop(e)}
                        >
                          {
                            createElement(
                              Option[item].render,
                              { data: {} },
                            )
                          }
                        </Tag>
                      )
                  }
                </div>

              );
          })
        }
      </div>
    );
  }
}
