'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMTagName = function DOMTagName(_ref) {
  var domNode = _ref.domNode;

  if (domNode) return _react2.default.createElement(
    'span',
    { style: {
        fontFamily: 'Menlo, monospace',
        fontSize: '11px',
        lineHeight: '14px',
        fontWeight: 900,
        padding: '2px 4px',
        textTransform: 'lowercase',
        background: '#333',
        color: 'orchid'
      } },
    domNode.tagName,
    _react2.default.createElement(
      'span',
      { style: { color: '#eee', fontWeight: 'normal' } },
      ' | ',
      domNode.getBoundingClientRect().width,
      ' × ',
      domNode.getBoundingClientRect().height
    )
  );
  return _react2.default.createElement('span', null);
};

exports.default = DOMTagName;