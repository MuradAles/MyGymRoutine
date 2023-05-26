import { useState, useEffect } from 'react';
import deleteExerciseFromRoutine from './DeleteExerciseFromRoutine'
import "./GetExercises.css"

const GetExercise = ({ exerciseId, userId, routineId, date }) => {
    const [exercise, setExercise] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

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
                console.log("getExercise", e)
            }
        };

        fetchExercise();
    }, [exerciseId]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleDeleteExercise = (e, userId, routineId) => {
        e.stopPropagation();
        deleteExerciseFromRoutine(userId, routineId, date, exerciseId, setExercise);
        setIsVisible(false);
    }
    if (exercise && isVisible) {
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
