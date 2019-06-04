import React, { forwardRef } from 'react';
import { Consumer } from './Context';
import applyResolvers from './applyResolvers';

const Box = forwardRef(({ component, children, ...rest }, ref) => (
  <Consumer>
    {(context) => {
      const Component = component;
      const props = applyResolvers(context, rest);

      return (
        <Component
          {...props}
          ref={ref}
        >
          {children}
        </Component>
      )
    }}
  </Consumer>
))

Box.defaultProps = {
  component: 'div',
}

Box.displayName = 'Box';

export default Box;
