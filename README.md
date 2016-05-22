Rebug
=====================

<!-- [![build status](https://img.shields.io/travis/xyc/rebug/master.svg?style=flat-square)](https://travis-ci.org/xyc/react-inspector) -->
[![npm version](https://img.shields.io/npm/v/rebug.svg?style=flat-square)](https://www.npmjs.com/package/react-inspector)
<!-- [![npm downloads](https://img.shields.io/npm/dm/rebug.svg?style=flat-square)](https://www.npmjs.com/package/react-inspector) -->

Disclaimer: Experimental project. APIs might change, use at your discretion.

Declaratively debug your component visually at per-component level.

![](https://cldup.com/OV7D9mP3L0.png)
![](https://cldup.com/cUtrBLPzRq-1200x1200.png)

## Usage

```js
/* Shows component display name and DOM tag name/dimensions if possible */
import { debugComponentName } from 'rebug'

class YourComponent extends React.Component{
  render(){
    return <div>My Component</div>
  }
}

export default debugComponentName(YourComponent)
```

Or use it as decorator:
```js
@debugComponentName
class Component extends React.Component {
  /*...*/
}
```

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
export debug(config)(YourComponent)
```

You can debug connected components as well:
```js
export debug(config)(connect(SomeComponent))
```

## Features
- [x] Show component's name, DOM tag name, dimensions
- [ ] WIP: inspect component props and state
  - [ ] detect state change

## Implementation and known issues
The goal is to overlay (it doesn't have to be a wrapper) the debugging segment on the original component.

Currently `debug` is implemented as a [Higher-order Component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)(HoC) and `YourComponent` is wrapped in an additional `div`. This might not work for some cases. Since border is rendered using box shadow, it might get blocked by the box shadow of the component to inspect.

Another approach is to render the additional component into the DOM tree on `componentDidMount`. Also need to check the support in React DevTools API.
