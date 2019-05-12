import applyMiddlewares from '../src/applyMiddlewares';

const marginXMiddleware = () => ({
  match: 'marginX',
  resolve: ({ key, value }) => ({
    marginRight: value,
    marginLeft: value,
  }),
})

const marginYMiddleware = () => ({
  match: 'marginY',
  resolve: ({ key, value }) => ({
    marginBottom: value,
    marginTop: value,
  }),
})

const middlewares = [
  [
    marginXMiddleware(),
    marginYMiddleware(),
  ]
]

const props = {
  color: 'red',
  marginX: '10px',
  marginY: '20px',
  marginBottom: '30px',
}

test('applies middlewares', () => {
  expect(applyMiddlewares(middlewares, props)).toStrictEqual({
    color: 'red',
    marginRight: '10px',
    marginLeft: '10px',
    marginTop: '20px',
    marginBottom: '30px',
  });
});

test('has correct props order', () => {
  expect(Object.keys(applyMiddlewares(middlewares, props))).toEqual([
    'color',
    'marginRight',
    'marginLeft',
    'marginTop',
    'marginBottom',
  ]);
});
