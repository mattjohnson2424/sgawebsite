import { useState, useEffect } from "react"
import { query, collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../firebase"
import Bio from "./Bio"
import "./BioList.css"

export const BioList = () => {

    const [bios, setBios] = useState([])

    const biosInit = async () => {
        const q = query(collection(db, "bios"));
        await onSnapshot(q, (querySnapshot) => {
            const dbBios = [];
            querySnapshot.forEach(doc => {
                dbBios.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setBios(dbBios)
        })
    }

    useEffect(() => {
        biosInit()
    }, [])

    return (
        <div className="bio-list-container">
            <div className="bio-list">
                {bios.map((bio, index) => (
                    <Bio key={index} bio={bio}/>
                ))}
            </div>
        </div>
    )
}

export default BioList