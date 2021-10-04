import { NotImplementedError } from '../extensions/index.js';

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
export default function deleteDigit(n) {
  let max = 0;

  let digits = n.toString().split('');
  for(let i = 0; i < digits.length; i++) {
    const newNumber = digits.splice(i, 1)[0];
    let topNumber = parseInt(digits.join(''));
    max = topNumber > max ? topNumber : max;
    digits.splice(i, 0, newNumber);
  }
  return max;
}
