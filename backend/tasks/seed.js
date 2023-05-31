//https://www.kaggle.com/datasets/edoardoba/fitness-exercises-with-animations
//Seed populates given data to MongoDB
const dbConnection = require('../config/mongoConnection');
const datas = require('../data');
const exercisesData = datas.exercises;

const fs = require("fs");
const { parse } = require("csv-parse");

const parseCSV = () => {
    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream("./tasks/fitness_exercises.csv")
            .pipe(
                parse({
                    delimiter: ",",
                    columns: true,
                    ltrim: true,
                })
            )
            .on("data", function (row) {
                data.push(row);
            })
            .on("end", function () {
                resolve(data);
            })
            .on("error", function (error) {
                reject(error);
            });
    });
};

const main = async () => {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();
    console.log("connected");
    // try {
    //     const data = await parseCSV();
    //     for (const row of data) {
    //         await exercisesData.createExercise({
    //             name: row.name,
    //             target: row.target,
    //             bodyPart: row.bodyPart,
    //             equipment: row.equipment,
    //             gifUrl: row.gifUrl,
    //         });
    //     }
    // } catch (error) {
    //     console.log(error.message);
    // }
    await dbConnection.closeConnection();
    console.log('Done!');
};

main();

