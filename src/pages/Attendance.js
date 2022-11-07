import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext";
import MyAttendance from "../components/attendance/MyAttendance";
import AdminAttendance from "../components/attendance/AdminAttendance";
import Navbar from "../components/general/Navbar"

export const Attendance = () => {

    const [viewAsAdmin, setViewAsAdmin] = useState(true)
    const user = useContext(UserContext)
    
    return (
        <>
            <Navbar/>
            <h1>Attendance</h1>
            <Link to="/">Back to Home</Link>
            <br/>
            {user.admin ? <>
                <button onClick={e => setViewAsAdmin(true)}>Admin Attendance</button>
                <button onClick={e => setViewAsAdmin(false)}>My Attendance</button>
                {viewAsAdmin ? <AdminAttendance/> : <MyAttendance/>}
            </> : <MyAttendance/>}
        </>
    )

}

export default Attendance;