import { useState } from "react"
import Modal from "../general/Modal"
import Delete from "../general/Delete"
import { deleteDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import UserContext from "../../contexts/UserContext"
import { useContext } from "react"
import { eventTypeConvertToColor } from "../../helpers/eventTypes"
import dayjs from "dayjs"

export const CalendarEvent = ({ event }) => {

    const [show, setShow] = useState(false)
    const user = useContext(UserContext)

    return (
        <>
            <div onClick={() => setShow(true)} className="calendar-event" style={{backgroundColor: eventTypeConvertToColor[event.eventType]}}>{event.title}</div>
            <Modal show={show} onClose={() => setShow(false)}>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>{dayjs(new Date(event.date)).format("dddd, MMMM DD")} from {event.startTime} - {event.endTime}</p>
                {user.admin && <Delete onDelete={async () => {
                    await deleteDoc(doc(db, 'calendar', event.id))
                    setShow(false)
                }}>Delete Event</Delete>}
            </Modal>
        </>
    )
}

export default CalendarEvent