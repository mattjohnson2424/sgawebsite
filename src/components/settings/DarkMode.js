import { useContext } from "react"
import SettingsContext from "../../contexts/SettingsContext"
import { doc, updateDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import "./DarkMode.css"

export const DarkMode = ({ user }) => {

    const { setShowLoadingScreen } = useContext(SettingsContext)

    const toggleMode = async () => {
        setShowLoadingScreen(true)

        if (user.theme === "light" || !user.theme) {
            await updateDoc(doc(db, "users", user.id), {
                theme: "dark"
            })
        } else {    
            await updateDoc(doc(db, "users", user.id), {
                theme: "light"
            })
        }

        setShowLoadingScreen(false)
    }

    return (
        <div className="dark-mode">
            <h2>Display Settings</h2>
            <button className="btn dark-mode-btn" onClick={toggleMode}>Change to {user.theme === "light" || !user.theme ? "Dark" : "Light"} Mode</button>
        </div>
    )
}

export default DarkMode