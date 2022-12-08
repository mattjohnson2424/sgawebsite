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
                {bios.sort((a,b) => {
                    let aValue;
                    let bValue;

                    if (a.rank === "admin") {
                        aValue = 1
                    } else {
                        aValue = 0
                    }

                    if (b.rank === "admin") {
                        bValue = 1
                    } else {
                        bValue = 0
                    }

                    return bValue - aValue

                }).map((bio, index) => (
                    <Bio key={index} bio={bio}/>
                ))}
            </div>
        </div>
    )
}

export default BioList