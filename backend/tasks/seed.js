//https://www.kaggle.com/datasets/edoardoba/fitness-exercises-with-animations
//Seed populates given data to MongoDB
const datas = require('../data');
const exercisesData = datas.exercises;

const fs = require("fs");
const { parse } = require("csv-parse");

const data = [];
const main = async () => {
    fs.createReadStream("./tasks/fitness_exercises.csv")
        .pipe(
            parse({
                delimiter: ",",
                columns: true,
                ltrim: true,
            })
        )
        .on("data", function (row) {
            // This will push the object row into the array
            data.push(row);
            exercisesData.createExercise({
                "name": row.name,
                "target": row.target,
                "bodyPart": row.bodyPart,
                "equipment": row.equipment,
                "gifUrl": row.gifUrl
            })
            console.log(row)
        })
        .on("error", function (error) {
            console.log(error.message);
        })
}

main();
