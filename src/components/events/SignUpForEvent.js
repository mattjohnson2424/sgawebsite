import { useContext } from "react"
import EventContext from "../../contexts/EventContext"
import UserContext from "../../contexts/UserContext"
import { doc, updateDoc, getDoc, deleteField } from "@firebase/firestore"
import { db } from "../../firebase"
import "./SignUpForEvent.css"

export const SignUpForEvent = () => {

    const event = useContext(EventContext)
    const user = useContext(UserContext)

    const signUp = async () => {
        if (Object.keys(event.signUps).length < event.maxSignUps || event.maxSignUps === null) {
            const docSnap = await getDoc(doc(db, "users", user.uid))
            await updateDoc(doc(db, 'events', event.id), {
                [`signUps.${user.uid}`]: {
                    ...docSnap.data()
                }
            })
        }
    }

    const unSignUp = async () => {
        await updateDoc(doc(db, 'events', event.id), {
            [`signUps.${user.uid}`]: deleteField()
        });
    }

    return (
        <>
            {event.hasSignUps && 
                <>
                    {((Object.keys(event.signUps).length < event.maxSignUps || event.maxSignUps === null) && !Object.keys(event.signUps).includes(user.uid)) && 
                        <div className="sign-up-container">
                            <p>This event has a sign up attached!</p>
                            <button className="btn sign-up" onClick={signUp}>Sign Up</button>
                        </div>            
                    }
                    {Object.keys(event.signUps).includes(user.uid) && 
                        <div className="sign-up-container">
                            <p>You are signed up for this event!</p>
                            <button className="btn design-up" onClick={unSignUp}>Cancel Registration</button>
                        </div>
                    }
                    {event.maxSignUps !== null && <p>{`${Object.keys(event.signUps).length}/${event.maxSignUps} people signed up`}</p>}
                </>
            }
        </>
    )
}

export default SignUpForEvent