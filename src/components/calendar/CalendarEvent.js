import { useState } from "react"
import Modal from "../general/Modal"
import Delete from "../general/Delete"
import { deleteDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import UserContext from "../../contexts/UserContext"
import { useContext } from "react"
import { eventTypeConvertToColor } from "../../helpers/eventTypes"
import dayjs from "dayjs"
import EditCalendarEvent from "./EditCalendarEvent"
import "./CalendarEvent.css"
import LoadingScreen from "../general/LoadingScreen"

export const CalendarEvent = ({ event }) => {

    const [show, setShow] = useState(false)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)
    const user = useContext(UserContext)

    return (
        <>
            <LoadingScreen show={showLoadingScreen}/>
            <div onClick={() => setShow(true)} className="calendar-event" style={{backgroundColor: eventTypeConvertToColor[event.eventType]}}>{event.title}</div>
            <Modal show={show} onClose={() => setShow(false)}>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>{event.location}</p>
                <p>{dayjs(new Date(event.date)).format("dddd, MMMM DD")}{! event.allDay && ` from ${event.startTime} - ${event.endTime}`}</p>
                
                {user.exec && 
                    <div className="edit-delete-calendar-event">
                        <EditCalendarEvent event={event}/>
                        <Delete 
                            deleteText="Are you sure you want to delete this event?" 
                            className="btn delete-calendar-event" 
                            onDelete={async () => {
                                setShowLoadingScreen(true)
                                await deleteDoc(doc(db, 'calendar', event.id))
                                setShow(false)
                                setShowLoadingScreen(false)
                            }}
                        >Delete Event</Delete>
                    </div>}
            </Modal>
        </>
    )
}

export default CalendarEvent