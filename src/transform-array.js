const { NotImplementedError } = require('../extensions/index.js');

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
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  let transformed = [];
  for (let i = 0; i < arr.length; i++) {
    switch(arr[i]) {
      case "--discard-next":
        i++;
        continue;
      case "--discard-prev":
        if (arr[i - 2] != "--discard-next") {
        transformed.pop();
        }
        continue;
      case "--double-next":
        if (arr[i + 1] != undefined) {
          transformed.push(arr[i + 1]);
        }
        continue;
      case "--double-prev":
        if (arr[i - 2] != "--discard-next" && arr[i - 1] != undefined) {
          transformed.push(transformed[transformed.length - 1]);
        }
        continue;
      default: transformed.push(arr[i]);
    }
  }
  return transformed;
}

module.exports = {
  transform
};
