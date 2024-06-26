//"american word": "british word"
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

const wordsGrouped = (arr, groupSize, start) => {
  let arrOfGroups = [];
  //push words separately before start
  for (let i = 0; i < start; i++) {
    arrOfGroups.push(arr[i]);
  }
  for (let j = start; j < arr.length; j += groupSize) {
    let wordsToJoin = arr.slice(j, j + groupSize);
    arrOfGroups.push(wordsToJoin.join(' '));
  }
  return arrOfGroups;
};

const findTranslationToBrit = wordString => {
  let stringToTranslate = wordString.toLowerCase();
  let translation;
  if (americanToBritishTitles[stringToTranslate] !== undefined) {
    translation = americanToBritishTitles[stringToTranslate];
  } else if (/[\.,?!]$/.test(wordString)) {
    stringToTranslate = wordString.toLowerCase().slice(0, -1);
  }
  if (americanToBritishSpelling[stringToTranslate] !== undefined) {
    translation = americanToBritishSpelling[stringToTranslate];
  }
  if (americanOnly[stringToTranslate] !== undefined) {
    translation = americanOnly[stringToTranslate];
  }
  if (/^[0-9]{1,2}\:[0-9]{2}$/.test(stringToTranslate)) {
    const indexOfColon = stringToTranslate.search(/\:/);
    translation = stringToTranslate.slice(0, indexOfColon) + '.' + stringToTranslate.slice(indexOfColon + 1, stringToTranslate.length);
  }

  if (translation === undefined) return wordString;

  let translatedWord = translation;
  if (wordString[0] === wordString[0].toUpperCase()) {
    translatedWord = translation[0].toUpperCase() + translation.slice(1);
  }
  if (stringToTranslate.length < wordString.length) {
    return translatedWord + wordString.slice(-1);
  }
  return translatedWord;
};

const findTranslationToAm = wordString => {
  let stringToTranslate = wordString.toLowerCase();
  let translation = Object.keys(americanToBritishSpelling).find(key => americanToBritishSpelling[key] === stringToTranslate);
  if (americanToBritishTitles[stringToTranslate + '.'] !== undefined) {
    translation = stringToTranslate + '.';
  } else if (/[\.,?!]$/.test(wordString)) {
    stringToTranslate = wordString.toLowerCase().slice(0, -1);
  }
  if (britishOnly[stringToTranslate] !== undefined) {
    translation = britishOnly[stringToTranslate];
  }
  if (/^[0-9]{1,2}\.[0-9]{2}$/.test(stringToTranslate)) {
    const indexOfDot = stringToTranslate.search(/\./);
    translation = stringToTranslate.slice(0, indexOfDot) + ':' + stringToTranslate.slice(indexOfDot + 1, stringToTranslate.length);
  }

  if (translation === undefined) return wordString;

  let translatedWord = translation;
  if (wordString[0] === wordString[0].toUpperCase()) {
    translatedWord = translation[0].toUpperCase() + translation.slice(1);
  }
  if (stringToTranslate.length < wordString.length) {
    return translatedWord + wordString.slice(-1);
  }
  return translatedWord;
};

class Translator {
  amToBrit(inputString) {
    //This does not work:
    //search for each object keys of the lists to include
    //does not work because of the order of words: "momma", "mom" --> ok, but "rif", "rif'd" --> not ok

    let previousSentence;
    let sentence = inputString;
    let arrOfTerms;
    //all terms in americanOnly consists of 1, 2 or 3 words
    for (let groupSize = 3; groupSize > 0; groupSize--) {
      for (let start = 0; start < groupSize; start++) {
        do {
          previousSentence = sentence;
          arrOfTerms = wordsGrouped(previousSentence.split(/\s+/), groupSize, start);
          sentence = arrOfTerms.map(term => findTranslationToBrit(term)).join(' ');
          //length of terms can change in this steps --> iteration needed
        } while (sentence !== previousSentence);
      }
    }

    return sentence;
  }

  britToAm(inputString) {
    //const numOfWords = Object.keys(britishOnly).map(key => key.split(' ').length);
    //console.log(`longest multiple word is ${Math.max(...numOfWords)} long`);

    let previousSentence;
    let sentence = inputString;
    let arrOfTerms;
    //all terms in britishOnly consists of 1, 2 or 3 words
    for (let groupSize = 3; groupSize > 0; groupSize--) {
      for (let start = 0; start < groupSize; start++) {
        do {
          previousSentence = sentence;
          arrOfTerms = wordsGrouped(previousSentence.split(/\s+/), groupSize, start);
          sentence = arrOfTerms.map(term => findTranslationToAm(term)).join(' ');
          //length of terms can change in this steps --> iteration needed
        } while (sentence !== previousSentence);
      }
    }

    return sentence;
  }

  addHighlight(originalString, translatedString) {
    if (originalString == translatedString) {
      return 'Everything looks good to me!';
    }
    let originalWords = originalString.split(' ');
    let translatedWords = translatedString.split(' ');
    let arrWithHighlight = [];
    let wordIndex = 0;
    while (wordIndex < translatedWords.length) {
      if (translatedWords[wordIndex] === originalWords[0]) {
        arrWithHighlight.push(translatedWords[wordIndex]);
        originalWords.shift();
        wordIndex++;
      } else {
        let foundMatch = false;
        //handle terms of multiple words
        //just searching for the word could cause mistake when the word is in a term on another place of the sentence
        for (let termLengthTr = 3; termLengthTr > 0; termLengthTr--) {
          let termTranslated = translatedWords.slice(wordIndex, wordIndex + termLengthTr).join(' ');
          for (let termLengthOr = 3; termLengthOr > 0; termLengthOr--) {
            let termOriginal = originalWords.slice(0, termLengthOr).join(' ');
            if (findTranslationToAm(termOriginal) === termTranslated || findTranslationToBrit(termOriginal) === termTranslated) {
              arrWithHighlight.push('<span class="highlight">' + termTranslated + '</span>');
              originalWords.splice(0, termLengthOr);
              wordIndex += termLengthTr;
              foundMatch = true;
            }
          }
        }
        if (foundMatch === false) {
          return `input1 and input2 are not translations`;
        }
      }
    }
    let stringWithHighlights = arrWithHighlight.join(' ');
    return stringWithHighlights;
  }
}

module.exports = Translator;
