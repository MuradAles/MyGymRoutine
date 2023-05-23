const addExerciseToRoutine = async (userId, routineId, date, exerciseId) => {
    try {
        await fetch('/routines/addExerciseToRoutine', {
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
        })
    } catch (e) {
        alert(e);
    }
}