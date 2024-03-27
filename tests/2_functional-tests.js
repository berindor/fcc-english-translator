const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

const Translator = require('../components/translator.js');
const { addHighlight } = new Translator();

suite('Functional Tests', () => {
  suite('POST to /api/translate', function () {
    test('text and valid locale field => { text, translation }', function (done) {
      const amString = 'Mangoes are my favorite fruit.';
      const britString = 'Mangoes are my favourite fruit.';
      const highlightedBrit = addHighlight(amString, britString);
      const highlightedAm = addHighlight(britString, amString);
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: amString, locale: 'american-to-british' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { text: amString, translation: highlightedBrit }, 'highlighted american to british');
        });
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: britString, locale: 'british-to-american' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { text: britString, translation: highlightedAm }, 'highlighted british to american');
          done();
        });
    });
    test('valid text and invalid locale field => { error: Invalid value for locale field }', function (done) {
      const britString = 'Mangoes are my favourite fruit.';
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: britString, locale: 'british-american' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid value for locale field' });
          done();
        });
    });
    test('missing text field => { error: Required field(s) missing }', function (done) {
      chai
        .request(server)
        .post('/api/translate')
        .send({ locale: 'british-to-american' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field(s) missing' });
        });
      chai
        .request(server)
        .post('/api/translate')
        .send({ locale: 'american-to-british' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field(s) missing' });
          done();
        });
    });
    test('missing locale field => { error: Required field(s) missing }', function (done) {
      const britString = 'Mangoes are my favourite fruit.';
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: britString })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field(s) missing' });
          done();
        });
    });
    test('empty text => { error: No text to translate }', function (done) {
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: '', locale: 'british-to-american' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'No text to translate' });
        });
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: '', locale: 'american-to-british' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'No text to translate' });
          done();
        });
    });
    test('text that needs no translation => { text, translation: Everything looks good to me! }', function (done) {
      const amString = 'Mangoes are my favorite fruit.';
      const britString = 'Mangoes are my favourite fruit.';
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: britString, locale: 'american-to-british' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { text: britString, translation: 'Everything looks good to me!' }, 'no translation needed american to british');
        });
      chai
        .request(server)
        .post('/api/translate')
        .send({ text: amString, locale: 'british-to-american' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { text: amString, translation: 'Everything looks good to me!' }, 'no translation needed british to american');
          done();
        });
    });
  });
});
