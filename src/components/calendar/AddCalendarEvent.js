import { useContext, useState } from "react"
import CalendarContext from "../../contexts/CalendarContext"
import dayjs from "dayjs"
import Modal from "../general/Modal"
import { addDoc, collection } from "@firebase/firestore"
import { db } from "../../firebase"
import { eventTypes, eventTypeColors } from "../../helpers/eventTypes"
import EventDateMenu from "./EventDateMenu"
import "./AddCalendarEvent.css"

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
            allDay: allDay,
            location: location
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
                <div className="input-group">
                    <input
                        id="new-calendar-event-title"
                        type="text" 
                        name="title"
                        value={title} 
                        required
                        onChange={e => setTitle(e.target.value)}
                    />
                    <span className="bar"></span>
                    <label htmlFor="new-calendar-event-title">Title</label>
                </div>
        
                <EventDateMenu/>

                <div className="input-group">
                    <input 
                        id="new-calendar-event-description"
                        type="text"
                        name="description"
                        value={description}
                        required
                        onChange={e => setDescription(e.target.value)}
                    />
                    <span className="bar"></span>
                    <label htmlFor="new-calendar-event-description">Description</label>
                </div>
                <div className="input-group">
                    <input 
                        id="new-calendar-event-location"
                        type="text"
                        name="location"
                        value={location}
                        required
                        onChange={e => setLocation(e.target.value)}
                    />
                    <span className="bar"></span>
                    <label htmlFor="new-calendar-event-location">Location</label>
                </div>
                
                
                <div className="event-type-container">
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
                <button className="btn add-calendar-event" type="submit" onClick={addEvent} disabled={!allDay && submissionError}>Save</button>
            </form>
        </Modal>
    )
}

export default AddCalendarEvent;