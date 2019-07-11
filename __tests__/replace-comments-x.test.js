import replaceComments from 'src/replace-comments-x';

/* eslint-disable-next-line compat/compat */
const hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
const ifSymbolIt = hasSymbol ? it : xit;

describe('replaceComments', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof replaceComments).toBe('function');
  });

  it('should throw when target is null or undefined', function() {
    expect.assertions(3);
    expect(function() {
      replaceComments();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      /* eslint-disable-next-line no-void */
      replaceComments(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      replaceComments(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should return the coerced argument when target is not a string', function() {
    expect.assertions(2);
    const values = [
      true,
      'abc',
      1,
      /* eslint-disable-next-line lodash/prefer-noop */
      function() {},
      [],
      /r/,
    ];
    const expected = values.map(String);
    const actual = values.map(replaceComments);
    expect(actual).toStrictEqual(expected);
    const date = new Date();
    expect(replaceComments(date)).toBe(String(date));
  });

  it('should return an empty string for basic comment matches', function() {
    expect.assertions(6);
    expect(replaceComments('/* test */')).toBe('');
    expect(replaceComments('/*test*/')).toBe('');
    expect(replaceComments('/** test */')).toBe('');
    expect(replaceComments('/**test*/')).toBe('');
    expect(replaceComments('// test')).toBe('');
    expect(replaceComments('//test')).toBe('');
  });

  it('should return the replacement string for basic comment matches', function() {
    expect.assertions(6);
    expect(replaceComments('/* test */', 'replaced')).toBe('replaced');
    expect(replaceComments('/*test*/', 'replaced')).toBe('replaced');
    expect(replaceComments('/** test */', 'replaced')).toBe('replaced');
    expect(replaceComments('/**test*/', 'replaced')).toBe('replaced');
    expect(replaceComments('// test', 'replaced')).toBe('replaced');
    expect(replaceComments('//test', 'replaced')).toBe('replaced');
  });

  it('if replacement supplied the coerced replacement for basic comment matches', function() {
    expect.assertions(6);
    /* eslint-disable-next-line no-void */
    expect(replaceComments('/* test */', void 0)).toBe('undefined');
    expect(replaceComments('/*test*/', null)).toBe('null');
    expect(replaceComments('/** test */', 1)).toBe('1');
    expect(replaceComments('/**test*/', true)).toBe('true');
    expect(replaceComments('// test', /ddd/)).toBe('/ddd/');
    const date = new Date();
    expect(replaceComments('//test', date)).toBe(String(date));
  });

  it('should return the correct string for complex comment matches', function() {
    expect.assertions(13);
    expect(replaceComments('complex;/* test */', ' ')).toBe('complex; ');
    expect(replaceComments('complex; /* test */', ' ')).toBe('complex;  ');
    expect(replaceComments('complex;/*test*/', ' ')).toBe('complex; ');
    expect(replaceComments('complex; /*test*/', ' ')).toBe('complex;  ');
    expect(replaceComments('complex;/** test */', ' ')).toBe('complex; ');
    expect(replaceComments('complex; /** test */', ' ')).toBe('complex;  ');
    expect(replaceComments('complex;/**test*/', ' ')).toBe('complex; ');
    expect(replaceComments('complex; /**test*/', ' ')).toBe('complex;  ');
    expect(replaceComments('complex;// test', ' ')).toBe('complex; ');
    expect(replaceComments('complex; // test', ' ')).toBe('complex;  ');
    expect(replaceComments('complex;//test', ' ')).toBe('complex; ');
    expect(replaceComments('complex; //test', ' ')).toBe('complex;  ');
    const actual = replaceComments('function /*1*/complex/*2*/(/*3*/)/*4*/{/*5*/}/*6*///test', ' ');
    const epected = 'function  complex ( ) { }  ';
    expect(actual).toBe(epected);
  });

  it('should throw for Object.create(null)', function() {
    expect.assertions(1);
    expect(function() {
      replaceComments(Object.create(null));
    }).toThrowErrorMatchingSnapshot();
  });

  it('should throw for replacement Object.create(null)', function() {
    expect.assertions(1);
    expect(function() {
      replaceComments('', Object.create(null));
    }).toThrowErrorMatchingSnapshot();
  });

  ifSymbolIt('should throw for Symbol', function() {
    expect.assertions(2);
    /* eslint-disable-next-line compat/compat */
    const sym = Symbol('foo');
    expect(function() {
      replaceComments(sym);
    }).toThrowErrorMatchingSnapshot();

    const symObj = Object(sym);
    expect(function() {
      replaceComments(Object(symObj));
    }).toThrowErrorMatchingSnapshot();
  });

  ifSymbolIt('should throw for replacement Symbol', function() {
    expect.assertions(2);
    /* eslint-disable-next-line compat/compat */
    const sym = Symbol('foo');
    expect(function() {
      replaceComments('', sym);
    }).toThrowErrorMatchingSnapshot();

    const symObj = Object(sym);
    expect(function() {
      replaceComments('', Object(symObj));
    }).toThrowErrorMatchingSnapshot();
  });
});
