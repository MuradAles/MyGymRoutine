import React, { useState } from 'react';
import GetExercise from '../exercises/GetExercise';
import './DaysList.css';

const DayList = ({ currentR, userId }) => {
    const [exerciseList, setExerciseList] = useState([]);
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');

    const searchExercise = async (e) => {
        e.preventDefault();
        const { page, search, target, bodyPart } = e.target.elements;
        try {
            const response = await fetch('/exercises/searchExercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: page.value,
                    search: search.value,
                    target: target.value,
                    bodyPart: bodyPart.value,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setExerciseList(data);
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            console.log('getExercise', e);
        }
    };

    const toggleSearchForm = (day) => {
        setShowSearchForm((prevState) => !prevState);
        setSelectedDay(day);
    };

    if (currentR !== null) {
        const days = Object.keys(currentR).filter((key) =>
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(key)
        );

        const searchResults =
            exerciseList.length > 0 && (
                <div className="searchBox">
                    <h4>Search Results</h4>
                    <ul>
                        {exerciseList.map((exercise, index) => (
                            <li key={index}>{exercise.name}</li>
                        ))}
                    </ul>
                </div>
            );

        return (
            <div className="day-list">
                {days.map((day) => (
                    <div key={day} className="day-column">
                        <strong>{day}</strong>
                        {showSearchForm && selectedDay === day ? (
                            <div className='searchBox'>
                                <form onSubmit={searchExercise}>
                                    <label htmlFor="Rname_Intput">
                                        Search Exercise
                                        <input className="input_tag" id="page" placeholder="page" autoComplete="off" defaultValue={1} />
                                        <input className="input_tag" id="search" placeholder="search" autoComplete="off" />
                                        <input className="input_tag" id="target" placeholder="target" autoComplete="off" />
                                        <input className="input_tag" id="bodyPart" placeholder="bodyPart" autoComplete="off" />
                                    </label>
                                    <button type="submit">Search Exercise</button>
                                    <button type="button" onClick={() => toggleSearchForm(day)}>
                                        Close
                                    </button>
                                    {searchResults}
                                </form>
                            </ div>
                        ) : (
                            <button type="button" onClick={() => toggleSearchForm(day)}>
                                Show Search Form
                            </button>
                        )}
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

export default DayList
