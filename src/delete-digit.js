const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let str = String(n);
  let max = 0;
  for(let i = 0; i < str.length; i++) {
    max = Math.max(max, str.replace(str[i], ''));
  }
  return max;
}

// return Number(String(n).replace(String(Math.min(...Array.from(n.toString(), Number))), ''));
module.exports = {
  deleteDigit
};
