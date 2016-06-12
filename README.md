Rebug
=====================

<!-- [![build status](https://img.shields.io/travis/xyc/rebug/master.svg?style=flat-square)](https://travis-ci.org/xyc/react-inspector) -->
[![npm version](https://img.shields.io/npm/v/rebug.svg?style=flat-square)](https://www.npmjs.com/package/react-inspector)
<!-- [![npm downloads](https://img.shields.io/npm/dm/rebug.svg?style=flat-square)](https://www.npmjs.com/package/react-inspector) -->

Disclaimer: Experimental project. APIs might change, use at your discretion.

Declaratively and visually debug your component at per-component level. 

![](https://cldup.com/OV7D9mP3L0.png)
![](https://cldup.com/cUtrBLPzRq-1200x1200.png)

## Usage

Installation:
```sh
npm i -S rebug
```

```js
/* Shows component display name and DOM tag name/dimensions if possible */
import { debugComponentName } from 'rebug'

class YourComponent extends React.Component{
  render(){
    return <div>My Component</div>
  }
}

/* instead of `export default YourComponent` */
export default debugComponentName(YourComponent)
```

Or use it as decorator:
```js
@debugComponentName
class Component extends React.Component {
  /*...*/
}
```

Hover your mouse over the component to see changes!

You can customize your debug configuration:
```js
import debug from 'rebug'
const config = {
  /* styles (currently it is the styles of wrapper component) */
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
}
export default debug(config)(YourComponent)
```

You can debug connected components as well:
```js
export default debug(config)(connect(mapStateToProps, mapDispatchToProps)(SomeComponent))
```

## Features
- [x] Show component's name, DOM tag name, dimensions
- [ ] WIP: inspect component props and state
  - [ ] detect state change
- [ ] Feature suggestions & pull requests welcome!

## Implementation and known issues
The goal is to overlay (it doesn't have to be a wrapper) the debugging segment on the original component.

Currently `debug` is implemented as a [Higher-order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)(HoC) and `YourComponent` is wrapped in an additional `div`. This might not work for some cases:
- Need to set `display` property
- some CSS selectors might not work as expected
- Since border is rendered using box shadow, it might get blocked by the box shadow of the component to inspect.

Another approach is to `ReactDOM.render` the overlay component into the DOM tree on `componentDidMount` and `ReactDOM.unmountComponentAtNode` the overlay component on `componentWillUnmount`. In order to display the overlay at the correct position, the DOM node of the inspected component needs to be accessible. For [stateless functional components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions), it needs to be wrapped to obtain the ref. 

> However, if a user wants to find the DOM node of a stateless function component, they must wrap the component in a stateful component (eg. ES6 class component) and attach the ref to the stateful wrapper component.

Also need to check the support in React DevTools API.
