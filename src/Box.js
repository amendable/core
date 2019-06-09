import React, { useState, Component, forwardRef } from 'react';
import { Consumer } from './Context';
import applyResolvers from './applyResolvers';

class InnerBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      component: props.component,
    }
  }

  render() {
    const {
      component,
      innerRef,
      ...rest
    } = this.props

    const Component = this.state.component

    return (
      <Component
        ref={innerRef}
        {...rest}
      />
    )
  }
}

const Box = forwardRef(({ children, ...rest }, ref) => (
  <Consumer>
    {(context) => {
      const props = applyResolvers(context, rest);

      return (
        <InnerBox
          {...props}
          innerRef={ref}
        >
          {children}
        </InnerBox>
      )
    }}
  </Consumer>
))

Box.defaultProps = {
  component: 'div',
}

Box.displayName = 'Box';

export default Box;
