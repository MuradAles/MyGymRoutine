import { apiInstance } from "../../utils/apiInstance";
const addExercisetoRoutine = async (userId, routineId, date, exerciseId, setCurrentR) => {
    try {
        const response = await apiInstance
            .post("/routines/addExerciseToRoutine", {
                user: userId,
                routineId: routineId,
                date: date,
                exerciseId: exerciseId
            });
        if (response.ok) {
            const data = await response.json();
            setCurrentR(data)
        } else {
            throw new Error('Request failed with status: ' + response.status);
        }
    } catch (e) {
        console.log("addExerciseToRoutinercise", e)
    }
}

export default addExercisetoRoutine;
