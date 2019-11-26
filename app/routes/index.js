const express = require('express');
const router  = express.Router();
const Translate = require('@google-cloud/translate');

// Google apis
let apiUrl;
let apiKey = process.env.GOOGLE_MAPS_API_KEY;


//Google translate API
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const location = 'global';
const text = 'Can I have a beer, please?';

const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;

// Instantiates a client
const translationClient = new TranslationServiceClient();
async function translateText(targetLanguage) {
  let sourceLanguage;

  // If target language is english, change sourcelanguage
  if(targetLanguage.includes('en')){
    sourceLanguage = 'es'
  } else {
    sourceLanguage = 'en'
  }

  // Construct request
  const request = {
    parent: translationClient.locationPath(projectId, location),
    contents: [text],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: sourceLanguage,
    targetLanguageCode: targetLanguage,
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  for (const translation of response.translations) {
    return translation.translatedText;
  }
}




/* GET home page */
router.get('/', (req, res, next) => {
   res.render('index');
});

router.get('/results/:countryCode', (req, res, next) => {
  translateText(req.params.countryCode).then(result => {
    apiUrl=`https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    res.render("results", {apiUrl, result});
  })

});


router.post("/results", (req, res, next) => {
  console.log(req.body)
})

router.get('/landing', (req, res, next) => {
  res.render('landing');
});

module.exports = router;
