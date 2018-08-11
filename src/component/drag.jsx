import React, { createElement } from 'react';
import PropTypes from 'prop-types';

export default class Drag extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    Option: PropTypes.object,
  };

  static defaultProps = {
    tag: 'div',
    Option: {},
  };

  /**
   * 拖拽开始
   */
  handleDragStart = (e) => {
    console.dir(e.target);
    e.dataTransfer.setData('text', e.target.innerHTML);
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
    console.log(e.dataTransfer.get('text'));
  }

  render() {
    // console.log(this.props);
    const {
      Option = {},
      tag: Tag,
    } = this.props;
    return (
      <div>
        {
          Object.keys(Option).map((item, i) => {
            console.log(Option[item], i);
            return Option[item].classNames === 'dragWarp' ? (
              <Tag
                className={Option[item].classNames}
                style={{ ...Option[item].styles }}
                onClick={e => this.handleClick(e)}
                key={i}
                data={Option[item].dragData}
                onDragStart={e => this.handleDragStart(e)}
                onDragEnd={e => this.handleDragEnd(e)}
              >
                {
                  Option[item].dragData ? Option[item].dragData.map((dItem, di) => {
                    console.log(dItem);
                    return createElement(
                      Option[item].render,
                      {
                        data: dItem,
                        key: di,
                      },
                    );
                  })
                    : createElement(
                      Option[item].render,
                      { ...Option[item] },
                    )

                }
              </Tag>
            )
              : (
                <Tag
                  className={Option[item].classNames}
                  style={{ ...Option[item].styles }}
                  key={i}
                  data={Option[item].dragData}
                  onDragStart={e => this.handleDragStart(e)}
                  onDragEnd={e => this.handleDragEnd(e)}
                  onDrop={e => this.handleOnDrop(e)}
                >
                  {
                    createElement(
                      Option[item].render,
                      { ...Option[item] },
                    )
                  }
                </Tag>
              );
          })
        }
      </div>
    );
  }
}
