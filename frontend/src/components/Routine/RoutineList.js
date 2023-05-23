const RoutineList = ({ list, getRoutine }) => {
    return (
        <ul>
            {list.map((listObj) => (
                <li key={listObj._id} onClick={() => getRoutine(listObj._id)}>
                    {listObj.name}
                </li>
            ))}
        </ul>
    );
};

export default RoutineList;