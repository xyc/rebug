import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const DOMTagName = ({ domNode }) => {
  if(domNode)
    return <span style={{
              fontFamily: 'Menlo, monospace',
              fontSize: '11px',
              lineHeight: '14px',
              fontWeight: 900,
              padding: '2px 4px',
              textTransform: 'lowercase',
              background: '#333',
              color: 'orchid',
            }}>
            {domNode.tagName}
            <span style={{ color: '#eee', fontWeight: 'normal' }}>
              {' | '}
              {domNode.getBoundingClientRect().width}
              {' × '}
              {domNode.getBoundingClientRect().height}
            </span>
          </span>
   return <span></span>
}

export default DOMTagName
