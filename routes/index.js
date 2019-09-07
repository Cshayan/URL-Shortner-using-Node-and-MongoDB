const express = require("express");
const router = express.Router();

const Url = require("../model/Url");

// Redirect to long url with url code
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({
            urlCode: req.params.code
        });

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).render("error", {
                title: "Page Not Found!",
                layout: "other"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(401).render("error", {
            title: "Page Not Found!",
            layout: "other"
        });
    }
});

module.exports = router;