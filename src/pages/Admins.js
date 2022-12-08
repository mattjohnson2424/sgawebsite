import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import CreateUser from "../components/admins/CreateUser";
import AdminContext from "../contexts/AdminContext";
import LoadingScreen from "../components/general/LoadingScreen";
import UserDisplay from "../components/admins/UserDisplay";

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
            {user.admin && 
                <AdminContext.Provider value={{showLoadingScreen, setShowLoadingScreen}}>
                    <LoadingScreen show={showLoadingScreen}/>
                    <CreateUser/>
                    <UserDisplay/>
                </AdminContext.Provider>
            }           
        </>
    )
}

export default Admins