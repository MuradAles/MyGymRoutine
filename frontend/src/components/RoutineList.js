import React from 'react';

const RoutineList = ({ list }) => {
    return (
        <ul>
            {list.map((listObj) => (
                <li key={listObj._id}>{listObj.name}</li>
            ))}
        </ul>
    );
};

export default RoutineList;