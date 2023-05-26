import { useState } from 'react';
import './RoutineList.css'

const RoutineList = ({ userId, list, getRoutine, deleteRoutine, createRoutine }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = (e, routineId) => {
        e.stopPropagation();
        deleteRoutine(userId, routineId);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (routineId) => {
        getRoutine(routineId);
        setIsOpen(false);
    };

    if (list) {
        return (
            <div className="dropdown">
                <button className="button-50" onClick={handleToggle}>
                    Select Routine
                </button>
                {isOpen && (
                    <div className='dropdown_menu'>
                        <ul>
                            {list.map((listObj) => (
                                <li key={listObj._id} onClick={() => handleItemClick(listObj._id)}>
                                    <div className="listItem">
                                        <div className="nameDiv button-54">{listObj.name}</div>
                                        <button className="button-54" onClick={(event) => handleDelete(event, listObj._id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="createRoutine">
                                    <form onSubmit={createRoutine}>
                                        <label htmlFor="Rname_Intput">
                                            Name new Routine:
                                            <br />
                                            <input
                                                className="input_tag"
                                                id="Rname_Intput"
                                                placeholder="Routine Name"
                                                autoComplete="off"
                                                maxLength="15"
                                                required
                                            />
                                        </label>
                                        <button className="button-54" type="submit">Create Routine</button>
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
};

export default RoutineList;
