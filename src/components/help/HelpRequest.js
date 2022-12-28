import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import EditHelp from "./EditHelp"
import "./HelpRequest.css"
import Respond from "./Respond"
import { deleteDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import Delete from "../general/Delete"
import LoadingScreen from "../general/LoadingScreen"

export const Help = ({ help }) => {

    const user = useContext(UserContext)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)

    const onDelete = async () => {
        setShowLoadingScreen(true)
        await deleteDoc(doc(db, 'help', help.id));
        setShowLoadingScreen(false)
    }

    return (
        <>
            <LoadingScreen show={showLoadingScreen}/>
            <div className="help-request">
                {user.admin && <h2>{help.addedByName} - {help.addedByEmail}</h2>}
                <p>{help.body}</p>
                <p className="help-response">{help.response}</p>
                <p>{user.admin ? help.formattedTimeStamp : `You made this request on ${help.formattedTimeStamp}`}</p>
                <div className="request-btn-row">
                    {help.addedByUID === user.uid && <EditHelp help={help}/>}
                    {user.admin && <Respond help={help}/>}
                    {(help.addedByUID === user.uid || user.admin) && <Delete onDelete={onDelete} className="btn delete-request" deleteText="Are you sure you want to delete this request?">Delete</Delete>}
                </div>
                

            </div>
        </>
    )
}

export default Help