//american word: brit word
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  amToBrit(inputString) {
    //TODO:
    //split by ' and -
    //deal with . (multiple sentences)
    //deal with times
    const splitWords = inputString.split(/\s+/);

    const findTranslation = wordString => {
      let translation = wordString;
      let stringToTranslate = wordString.toLowerCase();
      if (americanToBritishSpelling[stringToTranslate] !== undefined) {
        translation = americanToBritishSpelling[stringToTranslate];
      }
      if (americanToBritishTitles[stringToTranslate] !== undefined) {
        translation = americanToBritishTitles[stringToTranslate];
      }
      if (americanOnly[stringToTranslate] !== undefined) {
        translation = americanOnly[stringToTranslate];
      }
      let translationCorrectCase = translation;
      if (wordString[0] === wordString[0].toUpperCase()) {
        translationCorrectCase = translation[0].toUpperCase() + translation.slice(1);
      }
      return translationCorrectCase;

      //TODO: times
    };

    const translatedWords = splitWords.map(word => findTranslation(word));
    return translatedWords.join(' ');
  }

  britToAm(inputString) {
    return inputString;
  }
}

module.exports = Translator;
