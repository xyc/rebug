import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const ComponentName = ({ displayName, style }) =>
  <span style={
          Object.assign({},
            { fontFamily: 'Menlo, monospace',
              fontSize: '11px',
              lineHeight: '14px',
              fontWeight: 900,
              letterSpacing: '0 1em',//
              padding: '2px 4px',
              background: 'royalblue',
              color: '#eee',
            },
            style)
        }>
    {'<'}{displayName}{'>'}
  </span>

export default ComponentName
