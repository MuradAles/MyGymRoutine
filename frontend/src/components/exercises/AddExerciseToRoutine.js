import { useState, useEffect } from 'react';


const addExercise = ({ userId, routineId, date }) => {
    const addExercisetoRoutine = async (userId, routineId, date, exerciseId) => {
        try {
            const response = await fetch('/routines/addExerciseToRoutine', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: userId,
                    routineId: routineId,
                    date: date,
                    exerciseId: exerciseId
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            console.log("addexeaddExerciseToRoutinercise", e)
            alert(e);
        }
    }
}

export default addExercise;
