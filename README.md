<a
  href="https://travis-ci.org/Xotic750/replace-comments-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/replace-comments-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/replace-comments-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/replace-comments-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/replace-comments-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/replace-comments-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/replace-comments-x"
  title="npm version">
<img src="https://badge.fury.io/js/replace-comments-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/replace-comments-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/replace-comments-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/replace-comments-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/replace-comments-x?branch=master"
  alt="bettercodehub score" height="18">
</a>
<a
  href="https://coveralls.io/github/Xotic750/replace-comments-x?branch=master"
  title="Coverage Status">
<img src="https://coveralls.io/repos/github/Xotic750/replace-comments-x/badge.svg?branch=master"
  alt="Coverage Status" height="18">
</a>

<a name="module_replace-comments-x"></a>

## replace-comments-x

Replace the comments in a string.

<a name="exp_module_replace-comments-x--module.exports"></a>

### `module.exports(string, [replacement])` ⇒ <code>string</code> ⏏

This method replaces comments in a string.

**Kind**: Exported function  
**Returns**: <code>string</code> - The new string with the comments replaced.  
**Throws**:

- <code>TypeError</code> If string is null or undefined or not coercible.
- <code>TypeError</code> If replacement is not coercible.

| Param         | Type                | Description                             |
| ------------- | ------------------- | --------------------------------------- |
| string        | <code>string</code> | The string to be stripped.              |
| [replacement] | <code>string</code> | The string to be used as a replacement. |

**Example**

```js
import replaceComments from 'replace-comments-x';

console.log(replaceComments('test; /* test */', '')); // 'test;'
console.log(replaceComments('test; // test', '')); // 'test;'
```
