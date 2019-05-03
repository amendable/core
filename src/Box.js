import React from 'react';
import { Consumer } from './Context';
import applyMiddlewares from './applyMiddlewares';

const Box = ({ component, children, ...rest }) => (
  <Consumer>
    {({ middlewares }) => {
      const Component = component;
      const props = applyMiddlewares(middlewares, rest);

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
