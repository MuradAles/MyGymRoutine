import { useState, useEffect } from 'react';
import deleteExerciseFromRoutine from './DeleteExerciseFromRoutine'
import { apiInstance } from "../../utils/apiInstance";
import "./GetExercises.css"

const GetExercise = ({ exerciseId, userId, routineId, date }) => {
    const [exercise, setExercise] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await apiInstance.post('/exercises/getExercise', { exerciseId }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    setExercise(data);
                } else {
                    throw new Error('Request failed with status: ' + response.status);
                }
            } catch (e) {
                console.log(e);
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
                            <button className="button-54" onClick={(event) => handleDeleteExercise(event, userId, routineId)}>Remove</button>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export default GetExercise;
