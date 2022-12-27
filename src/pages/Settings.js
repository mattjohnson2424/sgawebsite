import { useContext, useEffect, useState } from "react";
import { db } from "../firebase"
import { doc, onSnapshot, query } from "@firebase/firestore"
import SettingsContext from "../contexts/SettingsContext"
import LoadingScreen from "../components/general/LoadingScreen"
import "./Settings.css"
import UserContext from "../contexts/UserContext";
import AllowText from "../components/settings/AllowText";
import EditPhone from "../components/settings/EditPhone";
import FullLoadingScreen from "../components/general/FullLoadingScreen"
// import { toE164 } from "../helpers/phoneHelpers";

export const Settings = () => {

    const uid = useContext(UserContext).uid
    const [user, setUser] = useState()
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)
    // const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        
        const userInit = async () => {
            const q = query(doc(db, "users", uid));
            await onSnapshot(q, (querySnapshot) => {
                setUser({
                    ...querySnapshot.data(),
                    id: querySnapshot.id
                })
            })
        }
        userInit()
        
        
    }, [uid])

    if (!user) return <FullLoadingScreen/>

    return (    
        <SettingsContext.Provider value={{ showLoadingScreen, setShowLoadingScreen }}>
            <LoadingScreen show={showLoadingScreen}/>
            
            <h1 style={{ textAlign: "center" }}>Settings</h1>
            <div className="settings-body">
                <AllowText user={user}/>
                <EditPhone user={user}/>
            </div>
        </SettingsContext.Provider>
    )
}

export default Settings;