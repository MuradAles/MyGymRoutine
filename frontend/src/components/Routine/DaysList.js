import React from 'react';
import GetExercise from '../exercises/GetExercise';
import './DaysList.css'
const DayList = ({ currentR, userId }) => {
    if (currentR !== null) {
        const days = Object.keys(currentR).filter(key =>
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(key)
        );
        return (
            <div className="day-list">
                {days.map(day => (
                    <div key={day} className="day-column">
                        <strong>{day}</strong>
                        <ul>
                            {currentR[day].map((exerciseId, index) => (
                                <li key={index}>
                                    <GetExercise userId={userId} routineId={currentR._id} date={day} exerciseId={exerciseId} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

export default DayList;
