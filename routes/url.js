const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../model/Url");

// @route /api/url/shorten
router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body;
    const baseUrl = config.get('baseURL');

    // Check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
    }

    // Generate url code
    const urlCode = shortid.generate();

    // Check the long url from client
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({
                longUrl
            });

            // if url found in database
            if (url) {
                res.json(url);
            } else {
                // construct the short url
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error!');
        }
    } else {
        res.status(400).json('Invalid URL. Cannot shorten it!');
    }

});

module.exports = router;