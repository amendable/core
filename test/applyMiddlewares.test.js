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
  expect(applyMiddlewares({ middlewares }, props)).toStrictEqual({
    color: 'red',
    marginRight: '10px',
    marginLeft: '10px',
    marginTop: '20px',
    marginBottom: '30px',
  });
});

test('has correct props order', () => {
  expect(Object.keys(applyMiddlewares({ middlewares }, props))).toEqual([
    'color',
    'marginRight',
    'marginLeft',
    'marginTop',
    'marginBottom',
  ]);
});

test('passes new props to next middleware', () => {
  const middlewares = [
    {
      match: ({ value }) => value === true,
      resolve: ({ key, value  }) => ({
        [key]: 1,
      })
    },
    {
      match: () => true,
      resolve: ({ key, value  }) => ({
        [key]: `${value}px`,
      })
    },
  ]

  const props = {
    padding: true,
    paddingLeft: 2,
  }

  expect(applyMiddlewares({ middlewares }, props)).toEqual({
    padding: '1px',
    paddingLeft: '2px',
  })
});

test('match works with a converted key', () => {
  const middlewares = [
    {
      match: 'backgroundColorBlue',
      resolve: ({ key, value  }) => ({
        backgroundColor: 'blue',
      })
    },
    {
      match: ['color', 'backgroundColor'],
      resolve: ({ key, value  }) => ({
        [key]: `touched-${value}`,
      })
    },
  ]

  const props = {
    color: 'red',
    backgroundColorBlue: true,
  }

  expect(applyMiddlewares({ middlewares }, props)).toEqual({
    color: 'touched-red',
    backgroundColor: 'touched-blue',
  })
});
