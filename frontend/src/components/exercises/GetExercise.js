import React, { useState, useEffect } from 'react';
import "./GetExercises.css"

const GetExercise = ({ exerciseId }) => {
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
                        </ul>
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export default GetExercise;
