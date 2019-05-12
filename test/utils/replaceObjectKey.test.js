import replaceObjectKey from '../../src/utils/replaceObjectKey';

const obj = {
  color: 'red',
  marginX: '10px',
  marginBottom: '30px',
}

const newObj = replaceObjectKey(obj, 'marginX', { marginLeft: '10px', marginRight: '10px' });

test('replaces object with exact position', () => {
  expect(newObj).toStrictEqual({
    color: 'red',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '30px',
  });
})

test('has correct order', () => {
  expect(Object.keys(newObj)).toStrictEqual([
    'color',
    'marginLeft',
    'marginRight',
    'marginBottom',
  ]);
})
