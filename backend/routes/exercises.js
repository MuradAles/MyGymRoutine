const express = require('express');
const router = express.Router();
const data = require('../data');
const exerciseData = data.exercises;

router
    .route('/exercises')
    .get(async (req, res) => {
        return "Eclsxercises"
    })

module.exports = router;