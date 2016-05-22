'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentName = function ComponentName(_ref) {
  var displayName = _ref.displayName;
  var style = _ref.style;
  return _react2.default.createElement(
    'span',
    { style: Object.assign({}, { fontFamily: 'Menlo, monospace',
        fontSize: '11px',
        lineHeight: '14px',
        fontWeight: 900,
        letterSpacing: '0 1em', //
        padding: '2px 4px',
        background: 'royalblue',
        color: '#eee'
      }, style) },
    '<',
    displayName,
    '>'
  );
};

exports.default = ComponentName;