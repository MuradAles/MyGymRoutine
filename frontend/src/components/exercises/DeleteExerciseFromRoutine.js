const deleteExerciseFromRoutine = async (userId, routineId, date, exerciseId) => {
    try {
        await fetch('/routines/deleteExerciseFromRoutine', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                routineId: routineId,
                date: date,
                exerciseId: exerciseId
            })
        })
    } catch (e) {
        alert(e);
    }
}

export default deleteExerciseFromRoutine;