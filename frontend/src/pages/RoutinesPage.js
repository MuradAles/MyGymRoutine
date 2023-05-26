import Logout from "../components/Authorization/Logout"
import RoutineList from "../components/Routine/RoutineList"
import DayList from "../components/Routine/DaysList"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../firebase/Auth"
import { Navigate } from 'react-router-dom';
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
                    console.log("getAllRoutines", e)
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
    const getRoutine = async (RoutineId) => {
        try {
            const response = await fetch('/routines/getRoutine', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: currentUser.uid,
                    routineId: RoutineId
                })
            })
            if (response.ok) {
                const data = await response.json();
                setCurrentR(data.currentRoutine)
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }
    const deleteRoutine = async (userId, RoutineId) => {
        try {
            const response = await fetch('/routines/deleteRoutine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: userId,
                    routineId: RoutineId
                })
            });
            if (response.ok) {
                const data = await response.json();
                setRList(data.deleteRoutine)
                if (currentR?._id === RoutineId) {
                    setCurrentR(null);
                }
            } else {
                throw new Error('Request failed with status: ' + response.status);
            }
        } catch (e) {
            console.log(e)
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
