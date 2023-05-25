const mongoCollections = require('../config/mongoCollections');
const exercisesData = mongoCollections.exercises;
const validation = require('../validation');
const { ObjectId } = require('mongodb');

const createExercise = async (data) => {
    const exercisesDataCollection = await exercisesData();
    const newInsertInformation = await exercisesDataCollection.insertOne(data);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed! (exercise)';
    return { Message: "Information been inserted" };
}

const showExercisesByFilter = async (data) => {
    const exercisesDataCollection = await exercisesData();
    const searchData = {};
    try {
        page = validation.checkPageValidation(Number(data.page))
    } catch (e) {
        return (e);
    }
    if (data?.name) {
        searchData.name = { $regex: new RegExp(data.name, "i") };
    }
    if (data?.target) {
        searchData.target = data.target;
    }
    if (data?.bodyPart) {
        searchData.bodyPart = data.bodyPart;
    }
    const exercisesOfConversation = await exercisesDataCollection
        .find(searchData)
        .limit(10)
        .skip(10 * (page - 1))
        .toArray();
    const count = await exercisesDataCollection
        .countDocuments(searchData);
    return exercisesOfConversation
}

const getExercise = async (exerciseId) => {
    const exercisesDataCollection = await exercisesData();
    const objectId = new ObjectId(exerciseId);
    const oneExercise = await exercisesDataCollection.findOne({ _id: objectId });
    if (oneExercise === null) throw 'No Routine found';
    return oneExercise
};

module.exports = { createExercise, showExercisesByFilter, getExercise }