import React, { useEffect, useState } from 'react';
import GetExercise from '../exercises/GetExercise';
import AddExerciseToRoutine from '../exercises/AddExerciseToRoutine'
import './DaysList.css';

const DayList = ({ currentR, userId, setCurrentR }) => {
    const [exerciseList, setExerciseList] = useState([]);
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [maxPage, setMaxPage] = useState();
    const [formValues, setFormValues] = useState({
        page: 1,
        search: '',
        target: '',
        bodyPart: '',
    });
    useEffect(() => {
        const searchExercise = async () => {
            try {
                const response = await fetch('/exercises/searchExercise', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });
                if (response.ok) {
                    const data = await response.json();
                    setMaxPage(Math.ceil(data.count / 10))
                    setExerciseList(data.exercisesOfConversation);
                } else {
                    throw new Error('Request failed with status: ' + response.status);
                }
            } catch (e) {
                console.log('getExercise', e);
            }
        };
        if (showSearchForm) {
            searchExercise();
        }
    }, [showSearchForm, formValues]);
    const toggleSearchForm = (day) => {
        setShowSearchForm((prevState) => !prevState);
        setSelectedDay(day);
        setFormValues({
            page: 1,
            search: '',
            target: '',
            bodyPart: '',
        })
    };
    const handleNext = () => {
        const nextPage = Math.min(formValues.page + 1, maxPage);
        setFormValues({ ...formValues, page: nextPage });
    };
    const handlePrevious = () => {
        const previousPage = Math.max(formValues.page - 1, 1);
        setFormValues({ ...formValues, page: previousPage });
    };
    const handleAddExercise = (e, userId, routineId, date, exerciseId) => {
        e.stopPropagation();
        AddExerciseToRoutine(userId, routineId, date, exerciseId, setCurrentR);
    }
    if (currentR !== null) {
        const days = Object.keys(currentR).filter((key) =>
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(key)
        );
        return (
            <div className="day-list">
                {days.map((day) => (
                    <div key={day} className="day-column">
                        <strong>{day}</strong>
                        {showSearchForm && selectedDay === day ? (
                            <div className='searchBox'>
                                <label htmlFor="page">Page:</label>
                                <button onClick={handlePrevious} disabled={formValues.page === 1}>
                                    Previous
                                </button>
                                <input
                                    className="input_tag"
                                    type="number"
                                    id="page"
                                    min="1"
                                    max={maxPage}
                                    value={formValues.page}
                                    onChange={(e) => setFormValues({ ...formValues, page: e.target.value })}
                                />
                                <button onClick={handleNext} disabled={formValues.page === maxPage}>
                                    Next
                                </button>
                                <label htmlFor="search">Search:</label>
                                <input
                                    className="input_tag"
                                    id="search"
                                    placeholder="Enter search query"
                                    autoComplete="off"
                                    onChange={(e) => setFormValues({ ...formValues, page: 1, search: e.target.value })}
                                />
                                <button type="button" onClick={() => toggleSearchForm(day)}>
                                    Close
                                </button>
                                {exerciseList.length > 0 && (
                                    <div className="searchBoxResult">
                                        <h4>Search Results</h4>
                                        <ul>
                                            {exerciseList.map((exercise, index) => (
                                                <li key={index}>
                                                    {exercise.name}
                                                    <br />
                                                    <img src={exercise.gifUrl} alt='GIF' />
                                                    <br />
                                                    <button onClick={(event) => handleAddExercise(event, userId, currentR._id, day, exercise._id)}>Add</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
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
