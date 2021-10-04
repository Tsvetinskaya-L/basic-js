import { NotImplementedError } from '../extensions/index.js';

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
export default function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!")
  }

  const sourceArr = [...arr];
  let resultArr = [];
  arr.forEach((value, index) => {
      resultArr = applyToArray(value, index, resultArr, sourceArr);
  });

  resultArr = resultArr.filter(item => item !== '_' && !!item);

  return resultArr;
}

function applyToArray(value, index, resultArr, sourceArr) {
  if (resultArr[index] === '_') {
    return resultArr;
  }


  switch (value) {
    case '--discard-next':
      if (sourceArr[index + 1]) {
        resultArr[index + 1] = '_';
      }
      break;
    case '--discard-prev':
      if (isAlreadyApplied(resultArr[index - 1])) { return resultArr }
      if (resultArr[index - 1]) {
        resultArr[index - 1] = '_';
      }
      break;
    case '--double-next':
      if (sourceArr[index + 1]) {
        resultArr[index] = sourceArr[index + 1];
        resultArr[index + 1] = '#';
      }
      break;
    case '--double-prev':
      if (isAlreadyApplied(resultArr[index - 1])) { return resultArr }
      if (sourceArr[index -1 ]) {
        resultArr[index] = resultArr[index - 1];
      }
      break;
    default:
      resultArr[index] = value;
  }

  return resultArr;
}

function isAlreadyApplied(value) {
  switch(value) {
    case '_':
    case '#':
    case '*':
      return true;
    default:
      return false;
  }
}

