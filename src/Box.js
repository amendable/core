import React from 'react';
import { Consumer } from './Context';

const applyMiddlewares = (props, middlwares) => {

}

const Box = ({ as, ...props }) => (
  <Consumer>
    {({ middlewares }) => {
      const Component = as;

    }}
  </Consumer>
)

Box.defaultProps = {
  as: 'div',
}

Box.displayName = 'Box';

export default Box;
