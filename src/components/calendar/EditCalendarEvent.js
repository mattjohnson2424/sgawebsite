import { useState, useEffect } from "react"
import Modal from "../general/Modal"
import dayjs from "dayjs"
import { getTimes, getTimeDifference } from "../../helpers/timeHelpers"
import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import { eventTypes, eventTypeColors } from "../../helpers/eventTypes"

export const EditCalendarEvent = ({ event }) => {

    const [show, setShow] = useState(false)

    const [showStartTimeSelector, setShowStartTimeSelector] = useState(false)
    const [showEndTimeSelector, setShowEndTimeSelector] = useState(false)

    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [allDay, setAllDay] = useState(event.allDay)
    const [startTime, setStartTime] = useState(event.startTime)
    const [endTime, setEndTime] = useState(event.endTime)
    const [eventType, setEventType] = useState(event.eventType)
    const [location, setLocation] = useState(event.location)

    const [submissionError, setSumbissionError] = useState(false)

    const updateCalendarEvent = async e => {
        e.preventDefault()

        await updateDoc(doc(db, 'calendar', event.id), {
            title: title,
            description: description,
            eventType: eventType,
            location: location,
            startTime: startTime,
            endTime: endTime,
            allDay: allDay
        });
        setShow(false)
    }

    useEffect(() => {
        if (getTimeDifference(startTime, endTime) < 0) {
            setSumbissionError(true)
        } else {
            setSumbissionError(false)
        }
    }, [startTime, endTime, setSumbissionError])

    return (
        <>
            <button onClick={() => setShow(true)}>Edit</button>
            <Modal show={show} onClose={() => {
                setShow(false)
                setTitle(event.title)
                setDescription(event.description)
                setAllDay(event.allDay)
                setStartTime(event.startTime)
                setEndTime(event.endTime)
                setEventType(event.eventType)
                setLocation(event.location)
            }}>
                    <label htmlFor="edit-calendar-event-title">Title: </label>
                    <input type="text" id="edit-calendar-event-title" value={title} onChange={e => setTitle(e.target.value)}/>
                    <label htmlFor="edit-calendar-event-description">Description: </label>
                    <input type="text" id="edit-calendar-event-description" value={description} onChange={e => setDescription(e.target.value)}/>
                    <label htmlFor="edit-calendar-event-location">Location</label>
                    <input type="text" id="edit-calendar-event-location" value={location} onChange={e => setLocation(e.target.value)}/>
                    <div className="add-event-time-info row">
                        <div>{dayjs(event.date).format("dddd, MMMM DD")}</div>
                        {!allDay && 
                            <>
                                <div className="time-info-container">
                                    <div 
                                        className='event-time-info' 
                                        onClick={() => {
                                            setShowStartTimeSelector(!showStartTimeSelector)
                                            setShowEndTimeSelector(false)
                                        }}
                                    >{startTime}</div>
                                    {showStartTimeSelector && <div className="time-selector">
                                        {getTimes().map((time, index) => (
                                            <div 
                                                key={index} 
                                                className="individual-time"
                                                onClick={() => {
                                                    setStartTime(time)
                                                    setShowStartTimeSelector(false)
                                                }}
                                            >{time}</div>
                                        ))}
                                    </div>}
                                </div>
                                -
                                <div className="time-info-container">
                                    <div 
                                        className='event-time-info' 
                                        onClick={() => {
                                            setShowEndTimeSelector(!showEndTimeSelector)
                                            setShowStartTimeSelector(false)
                                        }}
                                    >{endTime}</div>
                                    {showEndTimeSelector && <div className="time-selector">
                                        {getTimes().filter(time => {
                                            return getTimeDifference(startTime, time) >= 0
                                        }).map((time, index) => (
                                            <div 
                                                key={index} 
                                                className="individual-time"
                                                onClick={() => {
                                                    setEndTime(time)
                                                    setShowEndTimeSelector(false)
                                                }}
                                            >{time} - {getTimeDifference(startTime, time).toString()}hrs</div>
                                        ))}
                                    </div>}
                                </div>
                                {submissionError && <p className="submission-error">Start date must come before end date!</p>}
                            </>
                        }
                    </div>
                    <div className='event-time-info row all-day' onClick={() => {setAllDay(!allDay)}}>
                        <div className="all-day-checkbox">{allDay && <p>&#10004;</p>}</div>
                        <div>All Day</div>
                    </div>
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
                    <button onClick={updateCalendarEvent}>Save Changes</button>

            </Modal>
        </>
    )
}

export default EditCalendarEvent