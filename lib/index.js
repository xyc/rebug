'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugComponentName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tether = require('./tether');

var _tether2 = _interopRequireDefault(_tether);

var _ComponentName = require('./ComponentName');

var _ComponentName2 = _interopRequireDefault(_ComponentName);

var _DOMTagName = require('./DOMTagName');

var _DOMTagName2 = _interopRequireDefault(_DOMTagName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultHoveredStyles = {
  // borderSizing: 'borderBox',
  boxShadow: "0 0 0 1px royalblue",
  transition: "all 0.5s",
  WebkitTransition: "all 0.5s"
};

var defaultStyles = {
  // borderSizing: 'borderBox',
  transition: "all 0.5s",
  WebkitTransition: "all 0.5s"
};

var debug = function debug(config) {
  var styles = config.styles;
  var hoveredStyles = config.hoveredStyles;
  var debugView = config.debugView;


  return function (WrappedComponent) {
    var Enhancer = function (_Component) {
      _inherits(Enhancer, _Component);

      function Enhancer(props) {
        _classCallCheck(this, Enhancer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Enhancer).call(this, props));

        _this.state = {
          hovered: false,

          wrappedComponent: undefined,
          domNode: undefined
        };
        return _this;
      }

      _createClass(Enhancer, [{
        key: 'setHovered',
        value: function setHovered(hovered) {
          this.setState({ hovered: hovered });
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.setState({ wrappedComponent: this.wrappedComponent });
          this.setState({ domNode: _reactDom2.default.findDOMNode(this.wrappedComponent) });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          // transition to indicate changes
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(prevProps, prevState) {
          return true;
        }
      }, {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var displayName = WrappedComponent.displayName || WrappedComponent.name;

          var overlayStyles = this.state.hovered ? Object.assign({}, defaultHoveredStyles, hoveredStyles) : Object.assign({}, defaultStyles, styles);

          // const props = this.props
          // const wrappedComponent = this.state.wrappedComponent

          var debugElement = void 0;
          if (debugView) {
            var componentName = void 0,
                domTagName = void 0;
            console.log(debugView);
            if (debugView.ComponentName) {
              componentName = _react2.default.createElement(_ComponentName2.default, { displayName: displayName, style: debugView.ComponentName.styles });
            }
            if (debugView.DOMTagName) {
              domTagName = _react2.default.createElement(_DOMTagName2.default, { domNode: this.state.domNode });
            }
            debugElement = _react2.default.createElement(
              _tether2.default,
              { key: 'tethered', style: {
                  display: "flex",
                  flexFlow: "row nowrap",
                  alignItems: "flex-start"
                } },
              _react2.default.createElement(
                'span',
                { style: {
                    flex: "1 0 auto"
                  } },
                componentName
              ),
              _react2.default.createElement(
                'span',
                { style: {
                    flex: "1 0 auto"
                  } },
                domTagName
              )
            );
          }

          // console.log(debugElement)

          var tethered = this.state.hovered ? debugElement : undefined;
          return _react2.default.createElement(
            'div',
            { style: overlayStyles, onMouseEnter: this.setHovered.bind(this, true), onMouseLeave: this.setHovered.bind(this, false) },
            tethered,
            _react2.default.createElement(WrappedComponent, _extends({}, this.props, { ref: function ref(_ref) {
                _this2.wrappedComponent = _ref;
              } }))
          );
        }
      }]);

      return Enhancer;
    }(_react.Component);

    return Enhancer;
  };
};

var debugComponentName = debug({
  /* styles */
  styles: {},
  /* styles when component is hovered. */
  hoveredStyles: {
    boxShadow: "0 0 0 1px royalblue"
  },
  /* the debug view configuration, it's visible when component is hovered */
  debugView: {
    /* Shows the component name */
    ComponentName: {
      styles: {
        background: 'royalblue'
      }
    },
    /* Shows the DOM tag name and dimensions */
    DOMTagName: {}
  }
});

exports.debugComponentName = debugComponentName;
exports.default = debug;