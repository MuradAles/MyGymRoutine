const express = require('express');
const router = express.Router();
const data = require('../data');
const routinesData = data.routines;
const validation = require('../validation');

router
    .route('/create')
    .post(async (req, res) => {
        const userId = req.body.userId
        let routines = [];
        try {
            routines = await routinesData.createRoutine(userId);
            res.status(200).json(routines);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    })

router
    .route('/getAllRoutines')
    .post(async (req, res) => {
        const userId = req.body.userId
        let routines = [];
        try {
            routines = await routinesData.getAllRoutines(userId);
            res.status(200).json(routines);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    })

router
    .route('/getRoutine')
    .post(async (req, res) => {
        const routineId = req.body.routineId
        let routines = [];
        try {
            routines = await routinesData.getRoutine(routineId);
            res.status(200).json(routines);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    })

router
    .route('/deleteRoutine')
    .post(async (req, res) => {
        const routineId = req.body.routineId
        let routines = [];
        try {
            routines = await routinesData.deleteRoutine(routineId);
            res.status(200).json(routines);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    })

router
    .route('/addExerciseToRoutine')
    .post(async (req, res) => {
        routineId = req.body.routineId
        date = req.body.date
        exerciseId = req.body.exerciseId
        try {
            await routinesData.addExerciseToRoutine(routineId, date, exerciseId);
            res.status(200).json({ Message: "Exersise been added to routine" });
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    })

router
    .route('/deleteExerciseFromRoutine')
    .post(async (req, res) => {
        routineId = req.body.routineId
        date = req.body.date
        exerciseId = req.body.exerciseId
        try {
            await routinesData.deleteExerciseFromRoutine(routineId, date, exerciseId);
            res.status(200).json({ Message: "Exersise been deleted to routine" });
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    })

module.exports = router