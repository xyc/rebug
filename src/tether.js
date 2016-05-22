import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Tether extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,

      opacity: 0,
    }
  }

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this.tethered)
    const boundingClientRect = domNode.getBoundingClientRect()
    const { width, height } = boundingClientRect

    // console.log(boundingClientRect)
    // console.log(width, height)

    this.setState({
      width: width,
      height: height,

      opacity: 1,
    })
  }

  render() {
    // destructuring and default
    const { children, position = { top: 0, left: 0 }, style} = this.props
    const { top, bottom, left, right } = position
    return <div style={{position: 'relative'}}>
              <div ref={(ref) => {this.tethered = ref}} style={Object.assign({
                  position: 'absolute',
                  top: top - this.state.height - 1,
                  left: left,
                  bottom: bottom,
                  right: right,

                  zIndex: 9999,

                  opacity: this.state.opacity,                  
                  transition: "opacity 0.5s",
                  WebkitTransition: "opacity 0.5s",
                  }, style)}>
                { children }
              </div>
            </div>
  }
}

export default Tether
