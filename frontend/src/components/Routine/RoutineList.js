const RoutineList = ({ userId, list, getRoutine, deleteRoutine }) => {
    const handleDelete = (e, routineId) => {
        e.stopPropagation();
        deleteRoutine(userId, routineId);
    };
    if (list) {
        return (
            <ul>
                <>{
                    list.map((listObj) => (
                        <li key={listObj._id} onClick={() => getRoutine(listObj._id)}>
                            {listObj.name}
                            <button onClick={(event) => handleDelete(event, listObj._id)}>Delete</button>
                        </li>
                    ))
                }
                </>
            </ul>
        );
    }
};

export default RoutineList;