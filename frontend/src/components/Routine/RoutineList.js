import React, { useState } from 'react';

const RoutineList = ({ userId, list, getRoutine, deleteRoutine, createRoutine }) => {
    const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility

    const handleDelete = (e, routineId) => {
        e.stopPropagation();
        deleteRoutine(userId, routineId);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (routineId) => {
        getRoutine(routineId);
        setIsOpen(false); // Close the dropdown after selecting an item
    };

    if (list) {
        return (
            <div className="dropdown">
                <button className="dropdown-toggle" onClick={handleToggle}>
                    Select Routine
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        {list.map((listObj) => (
                            <li key={listObj._id} onClick={() => handleItemClick(listObj._id)}>
                                {listObj.name}
                                <button onClick={(event) => handleDelete(event, listObj._id)}>Delete</button>
                            </li>
                        ))}
                        <li>
                            <div className="createRoutine">
                                <form onSubmit={createRoutine}>
                                    <label htmlFor="Rname_Intput">
                                        Name new Routine
                                        <input
                                            className="input_tag"
                                            id="Rname_Intput"
                                            placeholder="Routine Name"
                                            autoComplete="off"
                                            required
                                        />
                                    </label>
                                    <button type="submit">Create Routine</button>
                                </form>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        );
    }
};

export default RoutineList;
