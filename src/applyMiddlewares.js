import applyMiddleware from './applyMiddleware';

const applyMiddlewares = (props, middlewares) => {
  const style = {};
  const originalProps = {};

  middlewares.forEach(middleware => {
    const middlewareData = applyMiddleware(middleware, props);

    Object.assign(style, middlewareData.style);
    Object.assign(originalProps, middlewareData.props);
  });

  return { style, props: originalProps };
}

export default applyMiddlewares;
