'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tether = function (_Component) {
  _inherits(Tether, _Component);

  function Tether(props) {
    _classCallCheck(this, Tether);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tether).call(this, props));

    _this.state = {
      width: 0,
      height: 0,

      opacity: 0
    };
    return _this;
  }

  _createClass(Tether, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var domNode = _reactDom2.default.findDOMNode(this.tethered);
      var boundingClientRect = domNode.getBoundingClientRect();
      var width = boundingClientRect.width;
      var height = boundingClientRect.height;

      // console.log(boundingClientRect)
      // console.log(width, height)

      this.setState({
        width: width,
        height: height,

        opacity: 1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // destructuring and default
      var _props = this.props;
      var children = _props.children;
      var _props$position = _props.position;
      var position = _props$position === undefined ? { top: 0, left: 0 } : _props$position;
      var style = _props.style;
      var top = position.top;
      var bottom = position.bottom;
      var left = position.left;
      var right = position.right;

      return _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        _react2.default.createElement(
          'div',
          { ref: function ref(_ref) {
              _this2.tethered = _ref;
            }, style: Object.assign({
              position: 'absolute',
              top: top - this.state.height - 1,
              left: left,
              bottom: bottom,
              right: right,

              zIndex: 9999,

              opacity: this.state.opacity,
              transition: "opacity 0.5s",
              WebkitTransition: "opacity 0.5s"
            }, style) },
          children
        )
      );
    }
  }]);

  return Tether;
}(_react.Component);

exports.default = Tether;