import React, { useEffect, useState } from 'react';
import GetExercise from '../exercises/GetExercise';
import AddExerciseToRoutine from '../exercises/AddExerciseToRoutine';
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
                    setMaxPage(Math.ceil(data.count / 10));
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
        });
    };

    const handleNext = () => {
        const nextPage = Math.min(formValues.page + 1, maxPage);
        setFormValues({ ...formValues, page: nextPage });
    };

    const handlePrevious = () => {
        const previousPage = Math.max(formValues.page - 1, 1);
        setFormValues({ ...formValues, page: previousPage });
    };

    const handleAddExercise = async (e, userId, routineId, date, exerciseId) => {
        e.stopPropagation();
        e.preventDefault();
        await AddExerciseToRoutine(userId, routineId, date, exerciseId, setCurrentR);
        const updatedRoutine = { ...currentR };
        updatedRoutine[date] = [...updatedRoutine[date], exerciseId];
        setCurrentR(updatedRoutine);
    };

    if (currentR !== null) {
        const days = Object.keys(currentR).filter((key) =>
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(key)
        );
        return (
            <div className="day_list">
                {days.map((day) => (
                    <React.Fragment key={day}>
                        <div key={day} className="day_column_right">
                            <strong>{day}</strong>
                            {showSearchForm && selectedDay === day ? (
                                <div className="searchBox">
                                    <div className='Pagination'>
                                        <label htmlFor="page">Page:</label>
                                        <button onClick={handlePrevious} disabled={formValues.page === 1}>
                                            Previous
                                        </button>
                                        {formValues.page}
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
                                    </div>
                                    <div className='Exercises_Search'></div>
                                    {exerciseList.length > 0 && (
                                        <div className="searchBoxResult">
                                            <h4>Search Results</h4>
                                            <ul>
                                                {exerciseList.map((exercise, index) => (
                                                    <li key={index}>
                                                        {exercise.name}
                                                        <br />
                                                        <img src={exercise.gifUrl} alt="GIF" />
                                                        <br />
                                                        <button
                                                            onClick={(event) =>
                                                                handleAddExercise(event, userId, currentR._id, day, exercise._id)
                                                            }
                                                        >
                                                            Add
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button type="button" onClick={() => toggleSearchForm(day)}>
                                    Show Search Form
                                </button>
                            )}
                        </div>
                        <div className="day_column_left">
                            <ul>
                                {currentR[day].map((exerciseId, index) => (
                                    <li key={index}>
                                        <GetExercise userId={userId} routineId={currentR._id} date={day} exerciseId={exerciseId} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    }
    return null;
};

export default DayList;
