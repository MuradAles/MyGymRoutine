const addExercisetoRoutine = async (userId, routineId, date, exerciseId, setCurrentR) => {
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
            setCurrentR(data)
        } else {
            throw new Error('Request failed with status: ' + response.status);
        }
    } catch (e) {
        console.log("addExerciseToRoutinercise", e)
        alert(e);
    }
}

export default addExercisetoRoutine;
