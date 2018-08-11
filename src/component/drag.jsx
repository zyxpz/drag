/* global document */
import React, { createElement } from 'react';
import PropTypes from 'prop-types';

export default class Drag extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    Option: PropTypes.object,
    dragClassName: PropTypes.string,
    dragStyle: PropTypes.object,
    dropClassName: PropTypes.string,
    dropStyle: PropTypes.object,
    defaultValue: PropTypes.array,
  };

  static defaultProps = {
    tag: 'div',
    Option: {},
    dragStyle: {},
    dragClassName: '',
    dropStyle: {},
    dropClassName: '',
    defaultValue: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };

    this.dragStartData = {};

    this.dragEnterData = {};
  }

  componentWillMount() {
    const {
      defaultValue = [],
    } = this.props;
    console.log();
    if (defaultValue.length > 0) {
      console.log(1);
      this.setState({
        list: defaultValue,
      });
    }
  }

  componentDidMount() {
    document.addEventListener('dragenter', this.handleDragEnter);
  }

  /**
   * 拖拽开始
   */
  handleDragStart = (e, data) => {
    const {
      dragClassName = '',
    } = this.props;
    /**
     * 火狐bug
     */
    e.dataTransfer.setData('text', data);

    if (e.target.parentNode.className === dragClassName) {
      e.target.addEventListener('drag', this.handleOndrag);

      e.target.addEventListener('dragend', this.handleDragEnd);

      this.dragStartData = data;
    } else {
      console.log(1);
    }
  }

  /**
   * 拖动中
   */
  handleOndrag = () => {
    // console.log('拖动中');
  }

  /**
   * 拖拽结束
   */
  handleDragEnd = (e) => {
    console.log('拖拽结束');
    e.dataTransfer.clearData('text');

    const {
      list = [],
    } = this.state;

    /**
     * 拖拽中又拖回原目标为空对象
     * 不再向list中添加
     */
    if (Object.keys(this.dragEnterData).length > 0) {
      list.push(this.dragEnterData);

      this.setState({
        list,
      });
    }
  }

  /**
   * 阻止drop默认事件
   */
  handleDllowDrop = (e) => {
    e.preventDefault();
  }

  /**
   * 进入目标容器
   */
  handleDragEnter = (e) => {
    e.preventDefault();
    const {
      dropClassName = '',
      dragClassName = '',
    } = this.props;
    if (e.target.className === dropClassName) {
      console.log('进入目标容器');

      this.dragEnterData = this.dragStartData;

      e.target.addEventListener('dragover', this.handleOnDragOver);

      e.target.addEventListener('dragleave', this.handleOnDragLeave);
    } else if (e.target.className === dragClassName) {
      console.log('返回原来容器');
      this.dragEnterData = {};
    }
  }

  /**
   * 目标容器中拖动
   */
  handleOnDragOver = (e) => {
    // console.log('目标容器中拖动');
    console.dir(e.target);
  }

  /**
   * 脱离目标容器
   */
  handleOnDragLeave = (e) => {
    const {
      dropClassName = '',
    } = this.props;
    if (e.target.className === dropClassName) {
      console.log('脱离目标容器');
    }
  }

  /**
   * 拖拽进drop
   * 不知道为什么react一直触发不了此事件
   */
  handleOnDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.get('text');
    console.log(data);
  }

  render() {
    // console.log(this.props);
    const {
      Option = {},
      tag: Tag,
      dragClassName = '',
      dropClassName = '',
      dragStyle = {},
      dropStyle = {},
    } = this.props;

    const {
      list = [],
    } = this.state;
    // console.log(list);
    return (
      <div>
        {
          Object.keys(Option).map((item, i) => {
            console.log();
            return item === 'dragWarp' ? (
              <div
                className={dragClassName}
                style={dragStyle}
                key={i}
              >
                {
                  Option[item].dragData.map((dItem, di) => {
                    console.log();
                    return (
                      <Tag
                        className={Option[item].classNames}
                        style={{ ...Option[item].styles }}
                        key={di}
                        onDragStart={e => this.handleDragStart(e, dItem)}
                        draggable
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
                  style={dropStyle}
                  className={dropClassName}
                >
                  {
                    list.length > 0 ? list.map((dpItem, dpI) => {
                      console.log(1);
                      return (
                        <Tag
                          className={Option[item].classNames}
                          style={{ ...Option[item].styles }}
                          key={dpI}
                          onDragStart={e => this.handleDragStart(e, dpItem)}
                          draggable
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
                        ''
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
