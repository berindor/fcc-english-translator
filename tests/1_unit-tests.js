const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let { amToBrit, britToAm } = new Translator();

suite('Unit Tests', () => {
  suite('Translate American to British English', () => {
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
    test(`We watched the footie match for a while. => ...soccer...`, () => {
      const britString = `We watched the footie match for a while.`;
      const amString = `We watched the soccer match for a while.`;
      assert.equal(britToAm(britString), amString);
    });
    test(`Paracetamol takes up to an hour to work. => Tylenol...`, () => {
      const britString = `Paracetamol takes up to an hour to work.`;
      const amString = `Tylenol takes up to an hour to work.`;
      assert.equal(britToAm(britString), amString);
    });
    test(`First, caramelise the onions. => ...caramelize...`, () => {
      const britString = `First, caramelise the onions.`;
      const amString = `First, caramelize the onions.`;
      assert.equal(britToAm(britString), amString);
    });
    test(`I spent the bank holiday at the funfair. => ...public holiday...carnival.`, () => {
      const britString = `I spent the bank holiday at the funfair.`;
      const amString = `I spent the public holiday at the carnival.`;
      assert.equal(britToAm(britString), amString);
    });
    test(`I had a bicky then went to the chippy.  => ...cookie...fish-and-chip shop.`, () => {
      const britString = `I had a bicky then went to the chippy.`;
      const amString = `I had a cookie then went to the fish-and-chip shop.`;
      assert.equal(britToAm(britString), amString);
    });
    test(`I've just got bits and bobs in my bum bag. => ...odds and ends...fanny pack.`, () => {
      const britString = `I've just got bits and bobs in my bum bag.`;
      const amString = `I've just got odds and ends in my fanny pack.`;
      assert.equal(britToAm(britString), amString);
    });
    test(`The car boot sale at Boxted Airfield was called off. => ...swap meet...`, () => {
      const britString = `The car boot sale at Boxted Airfield was called off.`;
      const amString = `The swap meet at Boxted Airfield was called off.`;
      assert.equal(britToAm(britString), amString);
    });
    test(`Have you met Mrs Kalyani? => ...Mrs. ...`, () => {
      const britString = `Have you met Mrs Kalyani?`;
      const amString = `Have you met Mrs. Kalyani?`;
      assert.equal(britToAm(britString), amString);
    });
    test(`Prof Joyner of King's College, London. => Prof. ...`, () => {
      const britString = `Prof Joyner of King's College, London.`;
      const amString = `Prof. Joyner of King's College, London.`;
      assert.equal(britToAm(britString), amString);
    });
    test(`Tea time is usually around 4 or 4.30. => ...4:30`, () => {
      const britString = `Tea time is usually around 4 or 4.30.`;
      const amString = `Tea time is usually around 4 or 4:30.`;
      assert.equal(britToAm(britString), amString);
    });
  });
  suite('Highlighting', () => {
    test(`Mangoes are my favorite fruit. => highlight ""`, () => {});
    test(`I ate yogurt for breakfast. => highlight ""`, () => {});
    test(`We watched the footie match for a while. => highlight ""`, () => {});
    test(`Paracetamol takes up to an hour to work. => highlight ""`, () => {});
  });
});
