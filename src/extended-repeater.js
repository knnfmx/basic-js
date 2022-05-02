const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  if (options.separator === undefined) {
    options.separator = '+';
  }
  if (options.additionSeparator === undefined) {
    options.additionSeparator = '|';
  }
  if (options.repeatTimes === undefined) {
    options.repeatTimes = 1;
  }
  if (options.additionRepeatTimes === undefined) {
    options.additionRepeatTimes = 1;
  }

  let repeated = [];

  for (let i = 0; i < options.repeatTimes; i++) {
    repeated.push(String(str));
    if (options.addition !== undefined && options.additionRepeatTimes > 0) {
      repeated.push(repeater(
        options.addition,
        {
          separator: options.additionSeparator,
          repeatTimes: options.additionRepeatTimes,
        }
      ));
    }
    if (i != options.repeatTimes - 1) {
      repeated.push(options.separator);
    }
  }
  return repeated.join('');
}

module.exports = {
  repeater
};
