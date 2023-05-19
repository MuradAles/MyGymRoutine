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
    return { Message: "Routine been created" };
};

const getAllRoutines = async (UserId) => {
    const routinesDataCollection = await routinesData();
    const allRoutines = await routinesDataCollection.find({ user: UserId }).toArray();
    if (allRoutines.length === 0) throw 'No Routines found';
    return allRoutines
};

const getRoutine = async (routineId) => {
    const routinesDataCollection = await routinesData();
    const objectId = new ObjectId(routineId);
    const oneRoutine = await routinesDataCollection.findOne({ _id: objectId });
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

const addExerciseToRoutine = async (routineId, date, exerciseId) => {
    const routinesDataCollection = await routinesData();
    const updateResult = await routinesDataCollection.updateOne(
        { _id: routineId },
        { $push: { [date]: exerciseId } }
    );
    if (updateResult.modifiedCount === 0) throw 'Insert failed! (Routine)';
    return { Message: "Exersise been added to routine" };
};

const deleteExerciseFromRoutine = async (routineId, date, exerciseId) => {
    const routinesDataCollection = await routinesData();
    const deleteResult = await routinesDataCollection.updateOne(
        { _id: routineId },
        { $pull: { [date]: exerciseId } }
    );
    if (deleteResult.modifiedCount === 0) throw 'Insert failed! (Routine)';
    return { Message: "Exersise been added to routine" };
};


module.exports = { createRoutine, getAllRoutines, getRoutine, addExerciseToRoutine, deleteExerciseFromRoutine, deleteRoutine }