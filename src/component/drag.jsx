/* global document */
import React, { createElement } from 'react';
import PropTypes from 'prop-types';

const now = +(new Date());
let index = 0;
const getUid = () => `drag-${now}-${index += 1}`;

let iddd = null;

const loop = () => { };
export default class Drag extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    Option: PropTypes.object,
    dragClassName: PropTypes.string,
    dragStyle: PropTypes.object,
    dropClassName: PropTypes.string,
    dropStyle: PropTypes.object,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    tag: 'div',
    Option: {},
    dragStyle: {},
    dragClassName: '',
    dropStyle: {},
    dropClassName: '',
    defaultValue: [],
    onChange: loop,
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
      this.setState({
        list: this.handleValudId(defaultValue),
      });
    }
  }

  componentDidMount() {
    document.addEventListener('dragenter', this.handleDragEnter);
  }

  componentWillReceiveProps(nextProps) {
    const {
      defaultValue = [],
    } = this.props;
    if (JSON.stringify(defaultValue) !== JSON.stringify(nextProps.defaultValue)) {
      this.setState({
        list: this.handleValudId(nextProps.defaultValue),
      });
    }
  }

  handleValudId = list => list.map(item => (
    {
      id: getUid(),
      itemData: item,
    }
  ))

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

    iddd = e.target.id;

    if (e.target.parentNode.className === dragClassName) {
      e.target.addEventListener('drag', this.handleOndrag);

      e.target.addEventListener('dragend', this.handleDragEnd);

      this.dragStartData = data;
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

    const {
      onChange = loop,
    } = this.props;

    iddd = null;

    /**
     * 拖拽中又拖回原目标为空对象
     * 不再向list中添加
     */
    if (Object.keys(this.dragEnterData).length > 0) {
      list.push({ id: getUid(), itemData: this.dragEnterData });
      this.setState({
        list,
      });

      this.dragEnterData = {};
    }

    onChange(list);
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
      Option: {
        dropWarp: {
          classNames = '',
        },
      },
    } = this.props;
    switch (e.target.className) {
      case dropClassName:
        console.log('进入目标容器');

        this.dragEnterData = this.dragStartData;

        e.target.addEventListener('dragover', this.handleOnDragOver);

        e.target.addEventListener('dragleave', this.handleOnDragLeave);
        break;
      case dragClassName:
        console.log('返回原来容器');
        this.dragEnterData = {};
        break;
      // todo
      case classNames:
        if (iddd) {
          this.setState({
            list: this.buildListShow({ id: iddd, i: e.target.getAttribute('index'), type: 'drag' }),
          });
        }
        break;
      default:
        break;
    }
  }

  /**
   * 目标容器中拖动
   */
  handleOnDragOver = () => {
    // console.log('目标容器中拖动');
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
    } else {
      this.dragEnterData = {};
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

  /**
   * @params
   * id 数组对象id，
   * i 对象索
   * type 类型
   */
  buildListShow = (params) => {
    const {
      list = [],
    } = this.state;

    const {
      id,
      i,
      type,
    } = params;

    const arr = list.filter(item => item.id !== id);

    let idI = '';

    switch (type) {
      case 'drag':
        idI = list.findIndex(item => item.id === id);
        arr.splice(i, 0, list[idI]);
        break;

      default:
        break;
    }

    return arr;
  };

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
                              ...dItem,
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
                      console.log();
                      return (
                        <Tag
                          className={Option[item].classNames}
                          style={{ ...Option[item].styles }}
                          key={dpI}
                          draggable
                          id={dpItem.id}
                          index={dpI}
                          onDragStart={e => this.handleDragStart(e)}
                          onDragEnd={e => this.handleDragEnd(e)}
                        >
                          {
                            createElement(
                              Option[item].render,
                              { ...dpItem.itemData },
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
