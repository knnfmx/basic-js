const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(type){
    this.type = type;
  }

  throwError(message, key) {
    if ((typeof (message) !== 'string' || typeof (key) !== 'string') || (!message || !key)) {
      throw new Error('Incorrect arguments!');
    }
  }
  
  encrypt(message, key) {
    
    let arrMessage = message.split('');
    let specialCharKey = 0;
    let encrypted =[];

    for (let i=0; i < arrMessage.length; i++) {
      if (arrMessage[i].match(/^[A-Za-z]+$/)) {
        let messageChar = arrMessage[i].toUpperCase().charCodeAt(0);
        let keyChar = key[specialCharKey].toUpperCase().charCodeAt(0);
        let cipher = (messageChar - 65) + keyChar;

        if (cipher > 90) {
          cipher = (cipher - 90) +64;
        }
        specialCharKey++;

        if (specialCharKey == key.length) {
          specialCharKey = 0;
        }
        encrypted.push(String.fromCharCode(cipher));
      }
      else {
        encrypted.push(arrMessage[i]);}
    }

    if (this.type == false) {
      return encrypted.reverse().join('');
    } else {
      return encrypted.join("");
    }
  }   

  decrypt(message, key) {

    let arrMessage = message.split('');
    let specialCharKey = 0;
    let decrypted =[];
    for (let i=0; i < arrMessage.length; i++) {
      if (arrMessage[i].match(/^[A-Za-z]+$/)) {

        let messageChar = arrMessage[i].toUpperCase().charCodeAt(0);
        let keyChar = key[specialCharKey].toUpperCase().charCodeAt(0);
        let cipher = (messageChar + 65) - keyChar;

        if (cipher < 65) {
          cipher = (cipher + 90) -64;
        }
        specialCharKey++;

        if (specialCharKey == key.length) {
          specialCharKey = 0;
        }
        decrypted.push(String.fromCharCode(cipher));
      }
      else {
        decrypted.push(arrMessage[i]);}
    }

    if (this.type == false) {
      return decrypted.reverse().join("");
    } else {
      return decrypted.join("");
    }
  }
}

module.exports = {
  VigenereCipheringMachine
};
