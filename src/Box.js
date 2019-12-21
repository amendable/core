import React, { memo, forwardRef } from 'react';
import { Consumer } from './Context';
import applyResolvers from './applyResolvers';

const Box = memo(forwardRef(({ children, ...rest }, ref) => (
  <Consumer>
    {(context) => {
      const { component, ...props } = applyResolvers(context, {
        component: 'div',
        ...rest,
      });

      if (!component) throw new Error('Component undefined in `Box`. Please check your Amendable resolvers.')

      const Component = component;

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
