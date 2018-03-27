const path = require('path');
const parse = require('./options').parse;

const omit = props => obj => {
  const clone = {};
  const propsToOmit = Array.isArray(props) ? props : [props];

  Object.keys(obj).forEach(key => {
    if (propsToOmit.indexOf(key) === -1) {
      clone[key] = obj[key];
    }
  });
  return clone;
};

const defaultOptions = Object.freeze({
  cache: 3600,
  maxConnections: 5,
  statics: 'static',
  zip: true
});

const testOptions = Object.freeze({
  source: 'source',
  destination: 'destination',
  cache: 1000,
  maxConnections: 2,
  statics: 'otherFolder',
  zip: false
});

const requiredParams = ['source', 'destination'];
const withoutSource = omit('source');

describe('parsing options', () => {
  requiredParams.forEach(requiredParam => {
    it(`will throw when ${requiredParam} is undefined`, () => {
      expect(() => {
        parse(omit(requiredParam)(testOptions));
      }).toThrow();
    });
  });
  it('will parse the source to the absolute path', () => {
    const parsed = parse(testOptions);

    expect(parsed.source).toBe(path.resolve(process.cwd(), testOptions.source));
  });
  it('will override all default options', () => {
    const parsed = parse(testOptions);

    expect(withoutSource(parsed)).toEqual(withoutSource(testOptions));
  });
  it('will use defaults when not provided', () => {
    const parsed = parse({ source: 'source', destination: 'destination' });

    expect(withoutSource(parsed)).toEqual(
      Object.assign({}, withoutSource(defaultOptions), {
        destination: 'destination'
      })
    );
  });
});
