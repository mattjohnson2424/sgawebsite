import { useContext, useState } from "react"
import CalendarContext from "../../contexts/CalendarContext"
import dayjs from "dayjs"
import Modal from "../general/Modal"
import { addDoc, collection } from "@firebase/firestore"
import { db } from "../../firebase"
import { eventTypes, eventTypeColors } from "../../helpers/eventTypes"
import EventDateMenu from "./EventDateMenu"

export const AddCalendarEvent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [eventType, setEventType] = useState(eventTypes[0])
    const { daySelected, 
            showEventModal, 
            setShowEventModal, 
            startTime,
            endTime,
            submissionError,
            allDay 
    } = useContext(CalendarContext)

    const addEvent = async e => {
        e.preventDefault()

        await addDoc(collection(db, "calendar"), {
            title: title,
            description: description,
            date: dayjs(daySelected).format("MM-DD-YYYY"),
            startTime: startTime,
            endTime: endTime,
            eventType: eventType,
            allDay: allDay
        })

        setShowEventModal(false)
        setTitle("")
        setDescription("")
        setLocation("")
    }

    return (
        <Modal show={showEventModal} onClose={() => setShowEventModal(false)}>
            <form>
                <h2>Add Event</h2>
                <label htmlFor="new-calendar-event-title">Title: </label>
                <input
                    id="new-calendar-event-title"
                    type="text" 
                    name="title" 
                    placeholder="Add title" 
                    value={title} 
                    // required
                    onChange={e => setTitle(e.target.value)}
                />
                <EventDateMenu/>
                <br/>
                <label htmlFor="new-calendar-event-description">Description: </label>
                <input 
                    id="new-calendar-event-description"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={description}
                    // required
                    onChange={e => setDescription(e.target.value)}
                />
                <br/>
                <label htmlFor="new-calendar-event-location">Location: </label>
                <input 
                    id="new-calendar-event-location"
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <div className="event-type-container row">
                    {eventTypes.map((event, index) => (
                        <div key={index} className="event-filter" onClick={() => setEventType(event)}>
                            <div
                                className="event-type-selector" 
                                style={{ backgroundColor: eventTypeColors[index] }}
                            >
                                {eventType === event && <p>&#10004;</p>}
                            </div>
                            <p>{`${event[0].toUpperCase()}${event.slice(1)}`}</p>
                        </div>
                    ))}
                    
                </div>
                <button type="submit" onClick={addEvent} disabled={!allDay && submissionError}>Save</button>
            </form>
        </Modal>
    )
}

export default AddCalendarEvent;