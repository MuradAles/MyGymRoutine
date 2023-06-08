import Logout from "../components/Authorization/Logout"
import RoutineList from "../components/Routine/RoutineList"
import DayList from "../components/Routine/DaysList"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../firebase/Auth"
import { Navigate } from 'react-router-dom';
import { apiInstance } from "../utils/apiInstance";
import "./RoutinesPage.css"
function RoutinesPage() {
    const { currentUser } = useContext(AuthContext)
    const [RList, setRList] = useState([]);
    const [currentR, setCurrentR] = useState(null);
    // /getAllRoutines
    useEffect(() => {
        if (currentUser) {
            const getAllRoutines = async () => {
                try {
                    const response = await apiInstance.post('/routines/getAllRoutines', {
                        userId: currentUser.uid,
                    });
                    if (response.status === 200) {
                        const data = response.data;
                        setRList(data.routinesList);
                    } else {
                        throw new Error('Request failed with status: ' + response.status);
                    }
                } catch (e) {
                    console.log(e);
                    alert(e);
                }
            }
            getAllRoutines()
        }
    }, [])
    // /createRoutine
    const createRoutine = async (e) => {
        e.preventDefault();
        const { Rname_Intput } = e.target
        try {
            const response = await apiInstance.post('/routines/create', {
                userId: currentUser.uid,
                routineName: Rname_Intput.value,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setRList([...RList, data.createdRoutine]);
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            alert(e);
        }
    }
    const getRoutine = async (RoutineId) => {
        try {
            const response = await apiInstance.post('/routines/getRoutine', {
                userId: currentUser.uid,
                routineId: RoutineId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setCurrentR(data.currentRoutine);
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const deleteRoutine = async (userId, RoutineId) => {
        try {
            const response = await apiInstance.post('/routines/deleteRoutine', {
                user: userId,
                routineId: RoutineId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setRList(data.deleteRoutine);
                if (currentR?._id === RoutineId) {
                    setCurrentR(null);
                }
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            {!currentUser ? (
                <Navigate to='/' />
            ) : (
                <>
                    <div className="Routine">
                        <div className="Top_Bar">
                            <div className="RoutineList">
                                <RoutineList userId={currentUser.uid} list={RList} getRoutine={getRoutine} deleteRoutine={deleteRoutine} createRoutine={createRoutine} />
                            </div>
                            <div className="CurrentName">
                                {currentR ? (
                                    <>
                                        <h1 className="Name_h1">{currentR.name}</h1>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="Name_h1">Select Routine</h1>
                                    </>
                                )}
                            </div>
                            <div className="Logout">
                                <Logout />
                            </div>
                        </div>
                        <div className="Bottom_Bar">
                            <DayList currentR={currentR} userId={currentUser.uid} setCurrentR={setCurrentR} />
                        </div>
                    </div>
                </>
            )}
        </>
    );

}

export default RoutinesPage;
