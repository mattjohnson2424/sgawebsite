import { useContext, useState } from "react"
import { addDoc, collection } from "@firebase/firestore"
import { db } from "../../firebase"
import UserContext from "../../contexts/UserContext"
import "./AddHelp.css"
import dayjs from "dayjs"
import LoadingScren from "../general/LoadingScreen"

export const AddHelp = () => {

    const [body, setBody] = useState("")
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)
    const user = useContext(UserContext)

    const addHelp = async () => {

        setShowLoadingScreen(true)

        await addDoc(collection(db, "help"), {
            timestamp: Date.now(),
            formattedTimeStamp: dayjs().format("dddd, MMMM D [a]t h:mma"),
            body: body,
            response: "",
            fulfilled: false,
            addedByName: user.firstName + " " + user.lastName,
            addedByUID: user.uid,
            addedByEmail: user.email,
        })

        setBody("")
        setShowLoadingScreen(false)

    }

    return (
        <>
            <LoadingScren show={showLoadingScreen}/>
            <div className="help-input">
                <div className="input-group">
                    <textarea required className="txtarea" id="add-announcement-description" value={body} onChange={e => setBody(e.target.value)}/>
                    <span className="bar"></span>
                    <label htmlFor="add-announcement-description">Make Help Request</label>
                </div>
                <button className="btn add-help-btn" onClick={addHelp}>Make Help Request</button>
            </div>
        </>
    )
}

export default AddHelp