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
        <div className="bio-list">
            {bios.sort((a,b) => {
                let aValue = 0;
                let bValue = 0;

                if (a.rank === "admin") {
                    aValue = 1
                }
                if (b.rank === "admin") {
                    bValue = 1
                }

                return bValue - aValue;

            }).map((bio) => (
                <Bio key={bio.id} bio={bio}/>
            ))}
        </div>
    )
}

export default BioList