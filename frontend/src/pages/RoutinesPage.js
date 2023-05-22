import Logout from "../components/Logout"
import RoutineList from "../components/RoutineList"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../firebase/Auth"
import { Navigate } from 'react-router-dom';
function RoutinesPage() {
    const [RList, setRList] = useState([]);
    const [currentR, setCurrentR] = useState(null);
    const { currentUser } = useContext(AuthContext)
    // /exercises/
    // /getAllRoutines
    useEffect(() => {
        const getAllRoutines = async () => {
            try {
                const response = await fetch('/routines/getAllRoutines', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: currentUser.uid,
                    })
                })
                if (response.ok) {
                    const data = await response.json();
                    setRList(data.routinesList);
                } else {
                    throw new Error('Request failed with status: ' + response.status);
                }
            } catch (e) {
                alert(e);
            }
        }
        getAllRoutines()
    }, [])
    // /create
    const HandleCreateRoutine = async (e) => {
        e.preventDefault();
        const { Rname_Intput } = e.target
        try {
            const response = await fetch('/routines/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: currentUser.uid,
                    routineName: Rname_Intput.value,
                })
            })
            if (response.ok) {
                const data = await response.json();
                setRList([...RList, data.createdRoutine])
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            alert(e);
        }
    }
    // /getRoutine
    const getRoutine = async (RoutineId) => {
        try {
            const response = await fetch('/routines/getRoutine', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    routineId: RoutineId
                })
            })
            if (response.ok) {
                const data = await response.json();
                console.log("data", data)
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            alert(e);
        }
    }
    const deleteRoutine = async (e) => {
        e.preventDefault();
        const { Rname_Intput } = e.target
        try {
            const response = await fetch('/routines/deleteRoutine', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: currentUser.uid,
                    routineName: Rname_Intput.value,
                })
            })
            if (response.ok) {
                const data = await response.json();
                setRList([...RList, data.createdRoutine])
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            alert(e);
        }
    }
    const addExerciseToRoutine = async (routineId, date, exerciseId) => {
        try {
            await fetch('/routines/addExerciseToRoutine', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    routineId: routineId,
                    date: date,
                    exerciseId: exerciseId
                })
            })
        } catch (e) {
            alert(e);
        }
    }
    const deleteExerciseFromRoutine = async (routineId, date, exerciseId) => {
        try {
            await fetch('/routines/deleteExerciseFromRoutine', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    routineId: routineId,
                    date: date,
                    exerciseId: exerciseId
                })
            })
        } catch (e) {
            alert(e);
        }
    }

    return (
        <>
            {!currentUser ? (
                <Navigate to='/' />
            ) : (
                <>
                    <div className="App">
                        <div className="Top_Bar">
                            <div className="RoutineList"><RoutineList list={RList} /></div>
                            <div className="HandleCreateRoutine">
                                <form onSubmit={HandleCreateRoutine}>
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
                            <div className="Logout"><Logout /></div>
                        </div>
                        <div className="Bottom_Bar">

                        </div>
                    </div>

                </>
            )}
        </>
    );

}

export default RoutinesPage;
