'use strict';

var replaceComments;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  replaceComments = require('../../index.js');
} else {
  replaceComments = returnExports;
}

var hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var ifSymbolIt = hasSymbol ? it : xit;

describe('replaceComments', function () {
  it('is a function', function () {
    expect(typeof replaceComments).toBe('function');
  });

  it('should throw when target is null or undefined', function () {
    expect(function () {
      replaceComments();
    }).toThrow();

    expect(function () {
      replaceComments(void 0);
    }).toThrow();

    expect(function () {
      replaceComments(null);
    }).toThrow();
  });

  it('should return the coerced argument when target is not a string', function () {
    var values = [
      true,
      'abc',
      1,
      function () {},
      [],
      /r/
    ];

    var expected = values.map(String);
    var actual = values.map(replaceComments);
    expect(actual).toEqual(expected);
    var date = new Date();
    expect(replaceComments(date)).toBe(String(date));
  });

  it('should return an empty string for basic comment matches', function () {
    expect(replaceComments('/* test */')).toBe('');
    expect(replaceComments('/*test*/')).toBe('');
    expect(replaceComments('/** test */')).toBe('');
    expect(replaceComments('/**test*/')).toBe('');
    expect(replaceComments('// test')).toBe('');
    expect(replaceComments('//test')).toBe('');
  });

  it('should return the replacement string for basic comment matches', function () {
    expect(replaceComments('/* test */', 'replaced')).toBe('replaced');
    expect(replaceComments('/*test*/', 'replaced')).toBe('replaced');
    expect(replaceComments('/** test */', 'replaced')).toBe('replaced');
    expect(replaceComments('/**test*/', 'replaced')).toBe('replaced');
    expect(replaceComments('// test', 'replaced')).toBe('replaced');
    expect(replaceComments('//test', 'replaced')).toBe('replaced');
  });

  it('if replacement supplied the coerced replacement for basic comment matches', function () {
    expect(replaceComments('/* test */', void 0)).toBe('undefined');
    expect(replaceComments('/*test*/', null)).toBe('null');
    expect(replaceComments('/** test */', 1)).toBe('1');
    expect(replaceComments('/**test*/', true)).toBe('true');
    expect(replaceComments('// test', /ddd/)).toBe('/ddd/');
    var date = new Date();
    expect(replaceComments('//test', date)).toBe(String(date));
  });

  it('should return the correct string for complex comment matches', function () {
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
    var actual = replaceComments('function /*1*/complex/*2*/(/*3*/)/*4*/{/*5*/}/*6*///test', ' ');
    var epected = 'function  complex ( ) { }  ';
    expect(actual).toBe(epected);
  });

  it('should throw for Object.create(null)', function () {
    expect(function () {
      replaceComments(Object.create(null));
    }).toThrow();
  });

  it('should throw for replacement Object.create(null)', function () {
    expect(function () {
      replaceComments('', Object.create(null));
    }).toThrow();
  });

  ifSymbolIt('should throw for Symbol', function () {
    var sym = Symbol('foo');
    expect(function () {
      replaceComments(sym);
    }).toThrow();

    var symObj = Object(sym);
    expect(function () {
      replaceComments(Object(symObj));
    }).toThrow();
  });

  ifSymbolIt('should throw for replacement Symbol', function () {
    var sym = Symbol('foo');
    expect(function () {
      replaceComments('', sym);
    }).toThrow();

    var symObj = Object(sym);
    expect(function () {
      replaceComments('', Object(symObj));
    }).toThrow();
  });
});
