import { useContext, useEffect, useState } from "react"
import { onSnapshot, collection, query } from "@firebase/firestore"
import { db } from "../../firebase"
import "./HelpList.css"
import UserContext from "../../contexts/UserContext"
import HelpRequest from "./HelpRequest"

export const HelpList = () => {

    const [help, setHelp] = useState([])
    const user = useContext(UserContext)

    useEffect(() => {

        const helpInit = async () => {
            const q = query(collection(db, "help"));
            await onSnapshot(q, (querySnapshot) => {
                const dbHelp = [];
                querySnapshot.forEach(doc => {
                    dbHelp.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setHelp(dbHelp.sort((a,b) => b.timestamp - a.timestamp))
            })
        }
        helpInit() 

    }, [])

    return (
        <div className="help-list">
            {help.filter(help => (
                user.admin || help.addedByUID === user.uid
            )).map((help) => (
                <div className="help">
                    <HelpRequest key={help.id} help={help}/>
                </div>
            ))}
        </div>
    )
}

export default HelpList