import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { functions } from "../firebase";
import { httpsCallable } from "@firebase/functions"
import UserContext from "../contexts/UserContext";
import CreateUser from "../components/admins/CreateUser"
import Navbar from "../components/general/Navbar"

export const Admins = () => {

    const [adminEmail, setAdminEmail] = useState("")
    const [officerEmail, setOfficerEmail] = useState("")
    const user = useContext(UserContext)

    const makeAdmin = async e => {
        e.preventDefault()
        const addAdminRole = httpsCallable(functions, 'addAdminRole');
        const result = await addAdminRole({ email: adminEmail })
        console.log(result)
        setAdminEmail("")
    }

    const makeOfficer = async e => {
        e.preventDefault()
        const addOfficerRole = httpsCallable(functions, 'addOfficerRole');
        const result = await addOfficerRole({ email: officerEmail })
        console.log(result)
        setOfficerEmail("")
    }

    return (
        <>
        {user.admin ? <>
            <Navbar/>
            <h1>Admins</h1>
            <Link to="/">Back to Home</Link>
            <form>
                <label htmlFor="make-admin-email">Enter email to make admin: </label>
                <input id="make-admin-email" type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)}/>
                <button onClick={makeAdmin}>Make Admin</button>
            </form>
            <form>
                <label htmlFor="make-officer-email">Enter email to make officer: </label>
                <input id="make-officer-email" type="email" value={officerEmail} onChange={e => setOfficerEmail(e.target.value)}/>
                <button onClick={makeOfficer}>Make Officer</button>
            </form>

            <h2>Create User</h2>
            <CreateUser/>
        </> : <>
            <p>You shouldn't be here!</p>
            <Link to="/">Back to Home</Link>
        </>}
        </>
    )
}

export default Admins