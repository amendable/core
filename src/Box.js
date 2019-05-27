import React from 'react';
import { Consumer } from './Context';
import applyResolvers from './applyResolvers';

const Box = ({ component, children, ...rest }) => (
  <Consumer>
    {(context) => {
      const Component = component;
      const props = applyResolvers(context, rest);

      return (
        <Component {...props}>
          {children}
        </Component>
      )
    }}
  </Consumer>
)

Box.defaultProps = {
  component: 'div',
}

Box.displayName = 'Box';

export default Box;
