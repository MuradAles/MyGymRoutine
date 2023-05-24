const deleteExerciseFromRoutine = async (userId, routineId, date, exerciseId, setExercise) => {
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
            setExercise(data)
        } else {
            throw new Error('Request failed with status: ' + response.status);
        }
    } catch (e) {
        alert(e);
    }
}

export default deleteExerciseFromRoutine;
