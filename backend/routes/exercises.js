const express = require('express');
const router = express.Router();
const data = require('../data');
const exerciseData = data.exercises;

router
    .route('/')
    .post(async (req, res) => {
        const searchData = {};
        if (req.body.page !== undefined) searchData.page = req.body.page
        if (req.body.search !== undefined) searchData.name = req.body.search;
        if (req.body.target !== undefined) searchData.target = req.body.target;
        if (req.body.bodyPart !== undefined) searchData.bodyPart = req.body.bodyPart;
        let exerciseList;
        try {
            exerciseList = await exerciseData.showExercisesByFilter(searchData)
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
        return res.status(200).json(exerciseList);
    })

module.exports = router;