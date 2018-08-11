'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('../css/drag.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document */


var now = +new Date();
var index = 0;
var getUid = function getUid() {
  return 'drag-' + now + '-' + (index += 1);
};

var iddd = null;

var loop = function loop() {};

var Drag = function (_React$Component) {
  _inherits(Drag, _React$Component);

  function Drag(props) {
    _classCallCheck(this, Drag);

    var _this = _possibleConstructorReturn(this, (Drag.__proto__ || Object.getPrototypeOf(Drag)).call(this, props));

    _this.handleValudId = function (list) {
      return list.map(function (item) {
        return {
          id: getUid(),
          itemData: item
        };
      });
    };

    _this.buildSetClassName = function (ele) {
      return ele.split(' ').slice(1).toString().replace(/,/gi, ' ');
    };

    _this.handleDragStart = function (e, data) {
      var dragClassName = _this.props.dragClassName;
      /**
       * 火狐bug
       */

      e.dataTransfer.setData('text', data);

      iddd = e.target.id;

      if (_this.buildSetClassName(e.target.parentNode.className) === dragClassName) {
        e.target.addEventListener('drag', _this.handleOndrag);

        e.target.addEventListener('dragend', _this.handleDragEnd);

        _this.dragStartData = data;
      }
    };

    _this.handleOndrag = function () {}
    // console.log('拖动中');


    /**
     * 拖拽结束
     */
    ;

    _this.handleDragEnd = function (e) {
      console.log('拖拽结束');
      e.dataTransfer.clearData('text');

      var _this$state$list = _this.state.list,
          list = _this$state$list === undefined ? [] : _this$state$list;
      var _this$props$onChange = _this.props.onChange,
          onChange = _this$props$onChange === undefined ? loop : _this$props$onChange;


      iddd = null;

      /**
       * 拖拽中又拖回原目标为空对象
       * 不再向list中添加
       */
      if (Object.keys(_this.dragEnterData).length > 0) {
        list.push({ id: getUid(), itemData: _this.dragEnterData });
        _this.setState({
          list: list
        });

        _this.dragEnterData = {};
      }

      onChange(list);
    };

    _this.handleDllowDrop = function (e) {
      e.preventDefault();
    };

    _this.handleDragEnter = function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          dropClassName = _this$props.dropClassName,
          dragClassName = _this$props.dragClassName,
          _this$props$Option$dr = _this$props.Option.dropWarp.classNames,
          classNames = _this$props$Option$dr === undefined ? '' : _this$props$Option$dr;

      switch (_this.buildSetClassName(e.target.className) || e.target.parentNode.className) {
        case dropClassName:
          console.log('进入目标容器');

          _this.dragEnterData = _this.dragStartData;

          e.target.addEventListener('dragleave', _this.handleOnDragLeave);
          break;
        case dragClassName:
          console.log('返回原来容器');
          _this.dragEnterData = {};
          break;
        // todo
        case classNames:
          if (iddd) {
            _this.setState({
              list: _this.buildListShow({ id: iddd, i: e.target.parentNode.getAttribute('index'), type: 'drag' })
            });
          }
          break;
        default:
          break;
      }
    };

    _this.handleOnDragOver = function () {}
    // console.log('目标容器中拖动');


    /**
     * 脱离目标容器
     */
    ;

    _this.handleOnDragLeave = function (e) {
      var dropClassName = _this.props.dropClassName;

      if (_this.buildSetClassName(e.target.className) === dropClassName) {
        console.log('脱离目标容器');
      } else {
        _this.dragEnterData = {};
      }
    };

    _this.handleOnDrop = function (e) {
      e.preventDefault();
      var data = e.dataTransfer.get('text');
      console.log(data);
    };

    _this.buildListShow = function (params) {
      var _this$state$list2 = _this.state.list,
          list = _this$state$list2 === undefined ? [] : _this$state$list2;
      var id = params.id,
          i = params.i,
          type = params.type;


      var arr = list.filter(function (item) {
        return item.id !== id;
      });

      var idI = '';

      switch (type) {
        case 'left':
          arr.splice(i - 1, 0, list[i]);
          break;
        case 'right':
          arr.splice(i + 1, 0, list[i]);
          break;
        case 'drag':
          idI = list.findIndex(function (item) {
            return item.id === id;
          });
          arr.splice(i, 0, list[idI]);
          break;

        default:
          // 删除
          break;
      }
      return arr;
    };

    _this.handleClick = function (current) {
      var onChange = _this.props.onChange;

      var list = _this.buildListShow(current);
      _this.setState({
        list: list
      });
      onChange(list.map(function (item) {
        return item.itemData;
      }));
    };

    _this.state = {
      list: []
    };

    _this.dragStartData = {};

    _this.dragEnterData = {};
    return _this;
  }

  _createClass(Drag, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props$defaultValue = this.props.defaultValue,
          defaultValue = _props$defaultValue === undefined ? [] : _props$defaultValue;

      if (defaultValue.length > 0) {
        this.setState({
          list: this.handleValudId(defaultValue)
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('dragenter', this.handleDragEnter);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props$defaultValue2 = this.props.defaultValue,
          defaultValue = _props$defaultValue2 === undefined ? [] : _props$defaultValue2;

      if (JSON.stringify(defaultValue) !== JSON.stringify(nextProps.defaultValue)) {
        this.setState({
          list: this.handleValudId(nextProps.defaultValue)
        });
      }
    }

    /**
     * 拖拽开始
     */


    /**
     * 拖动中
     */


    /**
     * 阻止drop默认事件
     */


    /**
     * 进入目标容器
     */


    /**
     * 目标容器中拖动
     */


    /**
     * 拖拽进drop
     * 不知道为什么react一直触发不了此事件
     */


    /**
     * @params
     * id 数组对象id，
     * i 对象索
     * type 类型
     */

  }, {
    key: 'renderMask',
    value: function renderMask(id, cIndex) {
      var _this2 = this;

      var _state$list = this.state.list,
          list = _state$list === undefined ? [] : _state$list;

      return _react2.default.createElement(
        'div',
        { className: '__mask' },
        cIndex !== 0 ? _react2.default.createElement(
          'span',
          {
            onClick: function onClick() {
              return _this2.handleClick({ id: id, i: cIndex, type: 'left' });
            }
          },
          '\u276E'
        ) : _react2.default.createElement('span', null),
        _react2.default.createElement(
          'span',
          {
            onClick: function onClick() {
              return _this2.handleClick({ id: id, i: cIndex, type: 'delete' });
            }
          },
          '\u2716'
        ),
        cIndex !== list.length - 1 ? _react2.default.createElement(
          'span',
          {
            onClick: function onClick() {
              return _this2.handleClick({ id: id, i: cIndex, type: 'right' });
            }
          },
          '\u276F'
        ) : _react2.default.createElement('span', null)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          _props$Option = _props.Option,
          Option = _props$Option === undefined ? {} : _props$Option,
          Tag = _props.tag,
          dragClassName = _props.dragClassName,
          dropClassName = _props.dropClassName,
          _props$dragStyle = _props.dragStyle,
          dragStyle = _props$dragStyle === undefined ? {} : _props$dragStyle,
          _props$dropStyle = _props.dropStyle,
          dropStyle = _props$dropStyle === undefined ? {} : _props$dropStyle;
      var _state$list2 = this.state.list,
          list = _state$list2 === undefined ? [] : _state$list2;

      return _react2.default.createElement(
        'div',
        { className: 'drag-drop-warp' },
        Object.keys(Option).map(function (item, i) {
          return item === 'dragWarp' ? _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('drop-warp', dragClassName),
              style: dragStyle,
              key: i
            },
            Option[item].dragData.map(function (dItem, di) {
              return _react2.default.createElement(
                Tag,
                {
                  className: Option[item].classNames,
                  style: _extends({}, Option[item].styles),
                  key: di,
                  onDragStart: function onDragStart(e) {
                    return _this3.handleDragStart(e, dItem);
                  },
                  draggable: true
                },
                (0, _react.createElement)(Option[item].render, _extends({}, dItem))
              );
            })
          ) : _react2.default.createElement(
            'div',
            {
              key: i,
              style: dropStyle,
              className: (0, _classnames2.default)('drop-warp', dropClassName)
            },
            list.length > 0 ? list.map(function (dpItem, dpI) {
              return _react2.default.createElement(
                Tag,
                {
                  className: Option[item].classNames,
                  style: _extends({}, Option[item].styles, { position: 'relative' }),
                  key: dpI,
                  draggable: true,
                  id: dpItem.id,
                  index: dpI,
                  onDragStart: function onDragStart(e) {
                    return _this3.handleDragStart(e);
                  },
                  onDragEnd: function onDragEnd(e) {
                    return _this3.handleDragEnd(e);
                  }
                },
                (0, _react.createElement)(Option[item].render, _extends({}, dpItem.itemData)),
                _this3.renderMask(dpItem.id, dpI)
              );
            }) : ''
          );
        })
      );
    }
  }]);

  return Drag;
}(_react2.default.Component);

Drag.propTypes = {
  tag: _propTypes2.default.string,
  Option: _propTypes2.default.object,
  dragClassName: _propTypes2.default.string,
  dragStyle: _propTypes2.default.object,
  dropClassName: _propTypes2.default.string,
  dropStyle: _propTypes2.default.object,
  defaultValue: _propTypes2.default.array,
  onChange: _propTypes2.default.func
};
Drag.defaultProps = {
  tag: 'div',
  Option: {},
  dragStyle: {},
  dragClassName: 'dragWarp',
  dropStyle: {},
  dropClassName: 'dropWarp',
  defaultValue: [],
  onChange: loop
};
exports.default = Drag;