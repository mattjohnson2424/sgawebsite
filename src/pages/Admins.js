import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import CreateUser from "../components/admins/CreateUser";
import AdminTable from "../components/admins/AdminTable";
import AdminContext from "../contexts/AdminContext";
import LoadingScreen from "../components/general/LoadingScreen";

export const Admins = () => {

    const user = useContext(UserContext)

    const [showLoadingScreen, setShowLoadingScreen] = useState(false)

    useEffect(() => {
        if (!user.admin) {
            window.location.href = "/"
        }
    }, [user])

    return (
        <>
            {user.admin ? 
            <AdminContext.Provider value={{showLoadingScreen, setShowLoadingScreen}}>
                <LoadingScreen show={showLoadingScreen}/>
                <h1>Admins</h1>
                <h2>Create User</h2>
                <CreateUser/>
                <AdminTable/>
            </AdminContext.Provider> : <>
                <p>You shouldn't be here!</p>
                <Link to="/">Back to Home</Link>
            </>}
        </>
    )
}

export default Admins