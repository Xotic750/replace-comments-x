import toStr from 'to-string-x';
import requireCoercibleToString from 'require-coercible-to-string-x';
import methodize from 'simple-methodize-x';
var EMPTY_STRING = '';
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var methodizedReplace = methodize(EMPTY_STRING.replace);
/**
 * This method replaces comments in a string.
 *
 * @param {string} [string] - The string to be stripped.
 * @param {string} [replacement=''] - The string to be used as a replacement.
 * @throws {TypeError} If string is null or undefined or not coercible.
 * @throws {TypeError} If replacement is not coercible.
 * @returns {string} The new string with the comments replaced.
 */

var replaceComments = function replaceComments(string, replacement) {
  return methodizedReplace(requireCoercibleToString(string), STRIP_COMMENTS, arguments.length > 1 ? toStr(replacement) : EMPTY_STRING);
};

export default replaceComments;

//# sourceMappingURL=replace-comments-x.esm.js.map