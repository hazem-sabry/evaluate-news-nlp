// TODO: Configure the environment variables
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js');
const fetch = require('node-fetch');

dotenv.config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;

const app = express();

app.use(cors());

// Use json
app.use(bodyParser.json());

// Use url encoded values
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static('dist'));

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'));
});

// INFO: a route that handling post request for new URL that coming from the frontend
app.post('/api', async (req, res) => {
    const { article_url } = req.body;
    const url = `${API_URL}?key=${API_KEY}&url=${article_url}&lang=en`;
    try {
        // { score_tag, agreement, subjectivity, confidence, irony }
        await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const { score_tag, agreement, subjectivity, confidence, irony } = data;
                res.send({
                    score_tag: score_tag,
                    agreement: agreement,
                    subjectivity: subjectivity,
                    confidence: confidence,
                    irony: irony
                });
            });
    } catch (error) {
        console.log(error.message);
    }
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error);
    console.log(`Server listening on port ${PORT}!`);
});


module.exports = {
    app
}
