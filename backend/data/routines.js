const mongoCollections = require('../config/mongoCollections');
const routinesData = mongoCollections.routines;
const { ObjectId } = require('mongodb');

const createRoutine = async (userId, nameRoutine) => {
    const routinesDataCollection = await routinesData();
    if (userId === undefined) throw "no userId";
    data = {
        user: userId,
        name: nameRoutine,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
    }
    const newInsertInformation = await routinesDataCollection.insertOne(data);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed! (Routine)';
    let newRoutine = getRoutine(newInsertInformation.insertedId.toString())
    return newRoutine;
};

const getAllRoutines = async (UserId) => {
    const routinesDataCollection = await routinesData();
    const allRoutines = await routinesDataCollection.find({ user: UserId }).toArray();
    if (allRoutines.length === 0) return [];
    return allRoutines
};

const getRoutine = async (userId, routineId) => {
    const routinesDataCollection = await routinesData();
    const objectId = new ObjectId(routineId);
    const oneRoutine = await routinesDataCollection.findOne({ user: userId, _id: objectId });
    if (oneRoutine === null) throw 'No Routine found';
    return oneRoutine
};

const deleteRoutine = async (routineId) => {
    const routinesDataCollection = await routinesData();
    const objectId = new ObjectId(routineId);
    const oneRoutine = await routinesDataCollection.deleteOne({ _id: objectId });
    if (oneRoutine.deletedCount === 0) throw `Could not delete Routine`;
    return true;
};

const addExerciseToRoutine = async (userId, routineId, date, exerciseId) => {
    const routinesDataCollection = await routinesData();
    const objectId = new ObjectId(routineId);
    const addResult = await routinesDataCollection.updateOne(
        { _id: objectId },
        { user: userId },
        { $push: { [date]: exerciseId } }
    );
    if (addResult.modifiedCount === 0) throw 'Exercise not found';
    return { Message: "Exersise been added from routine" };
};

const deleteExerciseFromRoutine = async (routineId, date, exerciseId) => {
    const routinesDataCollection = await routinesData();
    const objectId = new ObjectId(routineId);
    const deleteResult = await routinesDataCollection.updateOne(
        { _id: objectId },
        { $pull: { [date]: exerciseId } }
    );
    if (deleteResult.modifiedCount === 0) throw 'Exercise not found';
    return { Message: "Exersise been deleted from routine" };
};


module.exports = { createRoutine, getAllRoutines, getRoutine, addExerciseToRoutine, deleteExerciseFromRoutine, deleteRoutine }
