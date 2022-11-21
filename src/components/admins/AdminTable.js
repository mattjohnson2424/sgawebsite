import { useContext, useEffect, useState } from "react"
import { query, collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../firebase"
import AdminTableRow from "./AdminTableRow"
import UserContext from "../../contexts/UserContext"

export const AdminTable = () => {

    const [users, setUsers] = useState([])
    const user = useContext(UserContext)

    useEffect(() => {
        const usersInit = async () => {
            const q = query(collection(db, "users"));
            await onSnapshot(q, (querySnapshot) => {
                const dbUsers = [];
                querySnapshot.forEach(doc => {
                    dbUsers.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                const filteredUsers = dbUsers.filter(dbUser => dbUser.id !== user.uid && !dbUser.owner).filter(dbUser => {
                    return user.owner || !dbUser.admin
                })
                setUsers(filteredUsers)
            })
        }
        usersInit()
    }, [user])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Rank</th>
                        {user.owner && <>
                            <th>Promote</th>
                            <th>Demote</th>
                        </>}
                        <th>Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <AdminTableRow key={index} tableUser={user}/>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default AdminTable