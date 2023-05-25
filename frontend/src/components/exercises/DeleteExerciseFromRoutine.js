const deleteExerciseFromRoutine = async (userId, routineId, date, exerciseId) => {
    try {
        const response = await fetch('/routines/deleteExerciseFromRoutine', {
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
        console.log("deleteExerciseFromRoutine", e)
        alert(e);
    }
}

export default deleteExerciseFromRoutine;
