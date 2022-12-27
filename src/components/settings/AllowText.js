import { useContext, useState } from "react"
import SettingsContext from "../../contexts/SettingsContext"
import { doc, updateDoc } from "@firebase/firestore"
import { db } from "../../firebase"

export const AllowText = ({ user }) => {

    const [allowText, setAllowText] = useState(user && user.allowText)
    const { setShowLoadingScreen } = useContext(SettingsContext)

    const changeAllowText = async () => {
        setShowLoadingScreen(true)
        setAllowText(!user.allowText)
        await updateDoc(doc(db, "users", user.id), {
            allowText: !user.allowText
        })
        setShowLoadingScreen(false)
    }

    return (
        <div className="allow-text">
            <h2>SMS Status</h2>
            <div className="user-text-alert-row">
                <div className="alert-checkbox" onClick={changeAllowText}>{allowText && <p>&#10004;</p>}</div>
                <p>Send me text notifications from ELCA SGA!</p>
            </div>
        </div>
    )
}

export default AllowText