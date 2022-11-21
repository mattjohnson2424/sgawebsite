import { useContext } from "react"
import DeleteUser from "./DeleteUser"
import { httpsCallable } from "@firebase/functions"
import { functions } from "../../firebase"
import AdminContext from "../../contexts/AdminContext"
import UserContext from "../../contexts/UserContext"

export const AdminTableRow = ({ tableUser }) => {

    const { setShowLoadingScreen } = useContext(AdminContext)
    const user = useContext(UserContext)

    const addAdminRole = async () => {
        setShowLoadingScreen(true)
        const addAdminRole = httpsCallable(functions, 'addAdminRole')
        const result = await addAdminRole({ id: tableUser.id })
        console.log(result)
        setShowLoadingScreen(false)
    }

    const addOfficerRole = async () => {
        setShowLoadingScreen(true)
        const addOfficerRole = httpsCallable(functions, 'addOfficerRole')
        const result = await addOfficerRole({ id: tableUser.id })
        console.log(result)
        setShowLoadingScreen(false)
    }

    const demoteUser = async () => {
        setShowLoadingScreen(true)
        const demoteUser = httpsCallable(functions, 'demoteUser')
        const result = await demoteUser({ id: tableUser.id })
        console.log(result)
        setShowLoadingScreen(false)
    }

    return (
        <>
            <tr>
                
                <td>{tableUser.firstName + " " + tableUser.lastName}</td>
                <td>{tableUser.grade}</td>
                {tableUser.admin ? <td>Admin</td> : <>
                    {tableUser.officer ? <td>Officer</td> : <td>Student</td>}
                </>}
                {user.owner && <>
                    {tableUser.admin ? <td>User already admin!</td> : <>
                        {tableUser.officer ? <td><button onClick={addAdminRole}>Promote to Admin</button></td> : <td><button onClick={addOfficerRole}>Promote to Officer</button></td>}
                    </>}
                    {tableUser.admin || tableUser.officer ? <td><button onClick={demoteUser}>Demote</button></td> : <td>User already student!</td>}
                </>}
                
                <td><DeleteUser user={tableUser}/></td>
            </tr>
        </>
    )
}

export default AdminTableRow