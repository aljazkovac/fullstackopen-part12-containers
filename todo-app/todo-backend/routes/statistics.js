const redis = require('../redis')
const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const {getAsync} = require("../redis");


/* GET statistics data. */
router.get('/', async (req, res) => {
    let counter = await getAsync("counter") ?? 0;

    res.send({
        ...configs,
        "added todos": counter
    });
});

module.exports = router;
