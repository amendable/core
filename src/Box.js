import React from 'react';
import { Consumer } from './Context';
import applyMiddlewares from './applyMiddlewares';

const Box = ({ component, children, ...rest }) => (
  <Consumer>
    {(context) => {
      const Component = component;
      const props = applyMiddlewares(context, rest);

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
