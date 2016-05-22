import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Tether from './tether'

import ComponentName from './ComponentName'
import DOMTagName from './DOMTagName'

const defaultHoveredStyles = {
  // borderSizing: 'borderBox',
  boxShadow: "0 0 0 1px royalblue",
  transition: "all 0.5s",
  WebkitTransition: "all 0.5s",
}

const defaultStyles = {
  // borderSizing: 'borderBox',
  transition: "all 0.5s",
  WebkitTransition: "all 0.5s",
}

const debug = (config) => {
  const { styles, hoveredStyles, debugView } = config

  return (WrappedComponent) => {
    const Enhancer = class extends Component {
      constructor(props) {
        super(props)

        this.state = {
          hovered: false,

          wrappedComponent: undefined,
          domNode: undefined
        }
      }

      setHovered(hovered){
        this.setState({hovered: hovered})
      }

      componentDidMount() {
        this.setState({ wrappedComponent: this.wrappedComponent })
        this.setState({ domNode: ReactDOM.findDOMNode(this.wrappedComponent) })
      }

      componentWillUnmount () {
      }

      componentWillReceiveProps(nextProps) {
        // transition to indicate changes
      }

      shouldComponentUpdate(prevProps, prevState) {
        return true
      }

      render() {
        const displayName = WrappedComponent.displayName || WrappedComponent.name

        let overlayStyles = this.state.hovered ?
          Object.assign({}, defaultHoveredStyles, hoveredStyles) :
          Object.assign({}, defaultStyles, styles)

        // const props = this.props
        // const wrappedComponent = this.state.wrappedComponent

        let debugElement
        if(debugView) {
          let componentName, domTagName
          console.log(debugView)
          if(debugView.ComponentName){
            componentName = <ComponentName displayName={displayName} style={debugView.ComponentName.styles}/>
          }
          if(debugView.DOMTagName){
            domTagName = <DOMTagName domNode={this.state.domNode}/>
          }
          debugElement = (
            <Tether key="tethered" style={{
                                            display: "flex",
                                            flexFlow: "row nowrap",
                                            alignItems: "flex-start",
                                          }}>
              <span style={{
                  flex: "1 0 auto",
                }}>
                {componentName}
              </span>
              <span style={{
                  flex: "1 0 auto",
                }}>
                {domTagName}
              </span>
            </Tether>
          )
        }

        // console.log(debugElement)

        const tethered = this.state.hovered ? debugElement : undefined
        return <div style={overlayStyles} onMouseEnter={ this.setHovered.bind(this, true) } onMouseLeave={ this.setHovered.bind(this, false) }>
                  {tethered}
                  <WrappedComponent {...this.props} ref={ref => { this.wrappedComponent = ref }}>
                  </WrappedComponent>
               </div>
      }
    }

    return Enhancer
  }
}

const debugComponentName = debug({
  /* styles */
  styles: {
  },
  /* styles when component is hovered. */
  hoveredStyles: {
    boxShadow: "0 0 0 1px royalblue",
  },
  /* the debug view configuration, it's visible when component is hovered */
  debugView: {
    /* Shows the component name */
    ComponentName: {
      styles: {
        background: 'royalblue',
      }
    },
    /* Shows the DOM tag name and dimensions */
    DOMTagName: {}
  }
})

export { debugComponentName }

export default debug
