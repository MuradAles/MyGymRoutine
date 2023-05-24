import { useState, useEffect } from 'react';
import deleteExerciseFromRoutine from './DeleteExerciseFromRoutine'
import addExerciseToRoutine from "./AddExerciseToRoutine"
import "./GetExercises.css"

const GetExercise = ({ exerciseId, userId, routineId, date }) => {
    const [exercise, setExercise] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await fetch('/exercises/getExercise', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        exerciseId: exerciseId
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setExercise(data);
                } else {
                    throw new Error('Request failed with status: ' + response.status);
                }
            } catch (e) {
                alert(e);
            }
        };

        fetchExercise();
    }, [exerciseId]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleDeleteExercise = (e, userId, routineId) => {
        e.stopPropagation();
        deleteExerciseFromRoutine(userId, routineId, date, exerciseId, setExercise); // Pass setExercise as a parameter
    }
    const handleAddExercise = (e, userId, routineId) => {
        e.stopPropagation();
        addExerciseToRoutine(userId, routineId, date, exerciseId, setExercise); // Pass setExercise as a parameter
    }

    if (exercise) {
        return (
            <div className='oneExercise'>
                <div className='oneExerciseName' onClick={toggleDetails}>
                    {exercise.name}
                </div>
                {showDetails && (
                    <div className='oneExerciseBox'>
                        <ul>
                            <img src={exercise.gifUrl} alt='GIF' />
                            <li>target: {exercise.target}</li>
                            <li>bodyPart: {exercise.bodyPart}</li>
                            <li>equipment: {exercise.equipment}</li>
                            <button onClick={(event) => handleDeleteExercise(event, userId, routineId)}>Delete</button>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export default GetExercise;
