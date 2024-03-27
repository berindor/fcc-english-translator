'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const { amToBrit, britToAm, addHighlight } = new Translator();

  app.route('/api/translate').post((req, res) => {
    const { text, locale } = req.body;
    if (text === undefined || locale === undefined) {
      return res.send({ error: 'Required field(s) missing' });
    }
    if (locale !== 'american-to-british' && locale !== 'british-to-american') {
      return res.send({ error: 'Invalid value for locale field' });
    }
    if (text === '') {
      return res.send({ error: 'No text to translate' });
    }
    const translatedText = locale === 'american-to-british' ? amToBrit(text) : britToAm(text);
    const translation = addHighlight(text, translatedText);
    res.send({ text, translation });
    try {
    } catch (err) {
      res.send(err);
    }
  });
};
