import React, { useEffect, useState, useRef } from 'react';
import GetExercise from '../exercises/GetExercise';
import AddExerciseToRoutine from '../exercises/AddExerciseToRoutine';
import { apiInstance } from "../../utils/apiInstance";
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
    const searchBoxResultRef = useRef(null);
    useEffect(() => {
        const searchExercise = async () => {
            try {
                const response = await apiInstance.post('/exercises/searchExercise', formValues, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    setMaxPage(Math.ceil(data.count / 10));
                    setExerciseList(data.exercisesOfConversation);
                    scrollSearchBoxResultToTop();
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

    useEffect(() => {
        setShowSearchForm(false);
    }, [currentR?._id]);

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

    const scrollSearchBoxResultToTop = () => {
        if (searchBoxResultRef.current) {
            searchBoxResultRef.current.scrollTop = 0;
        }
    };

    if (currentR !== null) {
        const days = Object.keys(currentR).filter((key) =>
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(key)
        );
        return (
            <div className="day_list">
                {days.map((day) => (
                    <React.Fragment key={day}>
                        <div key={day} className="day_column">
                            <span className='DayName'>{day}</span>
                            <div className="Search">
                                {showSearchForm && selectedDay === day ? (
                                    <div className="searchBox">
                                        <div className="Pagination">
                                            <label htmlFor="search">
                                                <input
                                                    className="input_tag"
                                                    id="search"
                                                    placeholder="Enter search"
                                                    autoComplete="off"
                                                    onChange={(e) =>
                                                        setFormValues({ ...formValues, page: 1, search: e.target.value })
                                                    }
                                                />
                                            </label>
                                            <button
                                                className="button-54 left"
                                                type="button"
                                                onClick={() => toggleSearchForm(day)}
                                            >
                                                X
                                            </button>
                                            <br />
                                            <button
                                                className="button-54"
                                                onClick={handlePrevious}
                                                disabled={formValues.page === 1}
                                            >
                                                Previous
                                            </button>
                                            <span className="page">{formValues.page}</span>
                                            <button
                                                className="button-54"
                                                onClick={handleNext}
                                                disabled={formValues.page === maxPage}
                                            >
                                                Next
                                            </button>
                                        </div>
                                        {exerciseList.length > 0 && (
                                            <div className="searchBoxResult" ref={searchBoxResultRef}>
                                                <ul>
                                                    {exerciseList.map((exercise, index) => (
                                                        <li className="exercisesList" key={index}>
                                                            {exercise.name}
                                                            <br />
                                                            <img src={exercise.gifUrl} alt="GIF" />
                                                            <br />
                                                            <button
                                                                className="button-54"
                                                                onClick={(event) =>
                                                                    handleAddExercise(
                                                                        event,
                                                                        userId,
                                                                        currentR._id,
                                                                        day,
                                                                        exercise._id
                                                                    )
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
                                    <button
                                        className="button-54"
                                        type="button"
                                        onClick={() => toggleSearchForm(day)}
                                    >
                                        Show Search Form
                                    </button>
                                )}
                            </div>
                            <ul>
                                {currentR[day].map((exerciseId, index) => (
                                    <li key={index}>
                                        <GetExercise
                                            userId={userId}
                                            routineId={currentR._id}
                                            date={day}
                                            exerciseId={exerciseId}
                                        />
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
