import React, { memo, forwardRef } from 'react';
import { Consumer } from './Context';
import applyResolvers from './applyResolvers';

const Box = memo(forwardRef(({ children, ...rest }, ref) => (
  <Consumer>
    {(context) => {
      const { component, ...props } = applyResolvers(context, rest);
      const Component = component || 'div';

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
)))

Box.defaultProps = {
  component: 'div',
}

Box.displayName = 'Box';

export default Box;
