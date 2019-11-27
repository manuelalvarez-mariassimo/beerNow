const express = require('express');
const router  = express.Router();
const Translate = require('@google-cloud/translate');
const textToSpeech = require('@google-cloud/text-to-speech');


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

  let transText;

  for (const translation of response.translations) {
    transText = translation.translatedText;
  }

    // Create audio Text to Speach
    //main(transText, targetLanguage)
    return transText;
}

/*
// Google Text to Speech Api
const fs = require('fs');
const util = require('util');
async function main(textParam, languageCodeParam) {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();

  // The text to synthesize
  const text = textParam;
  const languageCode = languageCodeParam;


  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: languageCode, ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);

  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(__dirname + '/../public/sounds/output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}*/

/* Routes */
router.get('/', (req, res, next) => {
   res.render('index');
});

router.get('/results/:coords', (req, res, next) => {
  let coords = req.params.coords
  translateText("es").then(result => {
    apiUrl=`https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    res.render("results", {apiUrl, result, coords});
  })
});


router.post("/results", (req, res, next) => {
  console.log(req.body)
})

router.get('/landing', (req, res, next) => {
  res.render('landing');
});

module.exports = router;
