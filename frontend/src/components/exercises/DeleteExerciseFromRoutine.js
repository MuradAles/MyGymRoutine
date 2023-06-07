import { apiInstance } from "../../utils/apiInstance";
const deleteExerciseFromRoutine = async (userId, routineId, date, exerciseId) => {
    try {
        const response = await apiInstance.post('/routines/deleteExerciseFromRoutine', {
            user: userId,
            routineId: routineId,
            date: date,
            exerciseId: exerciseId,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const data = response.data;
            console.log(data);
        } else {
            throw new Error('Request failed with status: ' + response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

export default deleteExerciseFromRoutine;
