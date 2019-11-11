import applyResolvers from '../src/applyResolvers';

const marginXResolver = () => ({
  match: 'marginX',
  resolve: ({ key, value }) => ({
    marginRight: value,
    marginLeft: value,
  }),
});

const marginYResolver = () => ({
  match: 'marginY',
  resolve: ({ key, value }) => ({
    marginBottom: value,
    marginTop: value,
  }),
});

const resolvers = [[marginXResolver(), marginYResolver()]];

const props = {
  color: 'red',
  marginX: '10px',
  marginY: '20px',
  marginBottom: '30px',
};

test('applies resolvers', () => {
  expect(applyResolvers({ resolvers }, props)).toStrictEqual({
    color: 'red',
    marginRight: '10px',
    marginLeft: '10px',
    marginTop: '20px',
    marginBottom: '30px',
  });
});

test('has correct props order', () => {
  expect(Object.keys(applyResolvers({ resolvers }, props))).toEqual([
    'color',
    'marginRight',
    'marginLeft',
    'marginTop',
    'marginBottom',
  ]);
});

test('passes new props to next resolver', () => {
  const resolvers = [
    {
      match: ({ value }) => value === true,
      resolve: ({ key, value }) => ({
        [key]: 1,
      }),
    },
    {
      match: () => true,
      resolve: ({ key, value }) => ({
        [key]: `${value}px`,
      }),
    },
  ];

  const props = {
    padding: true,
    paddingLeft: 2,
  };

  expect(applyResolvers({ resolvers }, props)).toEqual({
    padding: '1px',
    paddingLeft: '2px',
  });
});

test('match works with a converted key', () => {
  const resolvers = [
    {
      match: 'backgroundColorBlue',
      resolve: ({ key, value }) => ({
        backgroundColor: 'blue',
      }),
    },
    {
      match: ['color', 'backgroundColor'],
      resolve: ({ key, value }) => ({
        [key]: `touched-${value}`,
      }),
    },
  ];

  const props = {
    color: 'red',
    backgroundColorBlue: true,
  };

  expect(applyResolvers({ resolvers }, props)).toEqual({
    color: 'touched-red',
    backgroundColor: 'touched-blue',
  });
});
