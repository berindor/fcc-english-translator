const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let { amToBrit, britToAm } = new Translator();

suite('Unit Tests', () => {
  suite.only('Translate American to British English', () => {
    test(`Mangoes are my favorite fruit. => ...favourite...`, () => {
      const amString = 'Mangoes are my favorite fruit.';
      const britString = 'Mangoes are my favourite fruit.';
      assert.equal(amToBrit(amString), britString);
    });
    test(`I ate yogurt for breakfast. => ...yoghurt...`, () => {
      const amString = 'I ate yogurt for breakfast.';
      const britString = 'I ate yoghurt for breakfast.';
      assert.equal(amToBrit(amString), britString);
    });
    test(`We had a party at my friend's condo. => ...flat`, () => {
      const amString = `We had a party at my friend's condo.`;
      const britString = `We had a party at my friend's flat.`;
      assert.equal(amToBrit(amString), britString);
    });
    test(`Can you toss this in the trashcan for me? => ...bin...`, () => {
      const amString = 'Can you toss this in the trashcan for me?';
      const britString = 'Can you toss this in the bin for me?';
      assert.equal(amToBrit(amString), britString);
    });
    test(`The parking lot was full. => ...car park...`, () => {
      const amString = `The parking lot was full.`;
      const britString = `The car park was full.`;
      assert.equal(amToBrit(amString), britString);
    });
    test(`Like a high tech Rube Goldberg machine. => ...Heath Robinson device`, () => {
      const amString = `Like a high tech Rube Goldberg machine.`;
      const britString = `Like a high tech Heath Robinson device.`;
      assert.equal(amToBrit(amString), britString);
    });
    test(`To play hooky means to skip class or work. => ...bunk off...`, () => {
      const amString = `To play hooky means to skip class or work.`;
      const britString = `To bunk off means to skip class or work.`;
      assert.equal(amToBrit(amString), britString);
    });
    test(`No Mr. Bond, I expect you to die. => ...Mr...`, () => {
      const amString = `No Mr. Bond, I expect you to die.`;
      const britString = `No Mr Bond, I expect you to die.`;
      assert.equal(amToBrit(amString), britString);
    });
    test(`Dr. Grosh will see you now. => `, () => {
      const amString = `Dr. Grosh will see you now.`;
      const britString = `Dr Grosh will see you now.`;
      assert.equal(amToBrit(amString), britString);
    });
    test(`Lunch is at 12:15 today. => `, () => {
      const amString = `Lunch is at 12:15 today.`;
      const britString = `Lunch is at 12.15 today.`;
      assert.equal(amToBrit(amString), britString);
    });
  });
  suite('Translate British to American English', () => {
    test(`We watched the footie match for a while. => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`Paracetamol takes up to an hour to work. => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`First, caramelise the onions. => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`I spent the bank holiday at the funfair. => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`I had a bicky then went to the chippy.  => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`I've just got bits and bobs in my bum bag. => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`The car boot sale at Boxted Airfield was called off. => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`Have you met Mrs Kalyani? => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`Prof Joyner of King's College, London. => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
    test(`Tea time is usually around 4 or 4.30. => `, () => {
      const britString = ``;
      const amString = ``;
      assert.equal(britToAm(amString), britString);
    });
  });
  suite('Highlighting', () => {
    test(`Mangoes are my favorite fruit. => highlight ""`, () => {});
    test(`I ate yogurt for breakfast. => highlight ""`, () => {});
    test(`We watched the footie match for a while. => highlight ""`, () => {});
    test(`Paracetamol takes up to an hour to work. => highlight ""`, () => {});
  });
});
