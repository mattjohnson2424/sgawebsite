import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import CalendarContext from "../../contexts/CalendarContext"
import { getTimes, getTimeDifference } from "../../helpers/timeHelpers"
import Modal from "../general/Modal"
import "./EventDateMenu.css"

export const EventDateMenu = () => {

    const [showStartTimeSelector, setShowStartTimeSelector] = useState(false)
    const [showEndTimeSelector, setShowEndTimeSelector] = useState(false)

    const { daySelected,
            startTime,
            setStartTime,
            endTime,
            setEndTime,
            allDay,
            setAllDay,
            submissionError,
            setSumbissionError
    } = useContext(CalendarContext)

    useEffect(() => {
        if (getTimeDifference(startTime, endTime) < 0) {
            setSumbissionError(true)
        } else {
            setSumbissionError(false)
        }
    }, [startTime, endTime, setSumbissionError])

    return (
        <div className="event-date-menu">
            <div className="add-event-time-info">
                <div>{dayjs(daySelected).format("dddd, MMMM DD")}</div>
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
                            <Modal className="start-end-time-selector" show={showStartTimeSelector} onClose={() => setShowStartTimeSelector(false)}>
                                <div className="time-selector">
                                    <h3>Start Time</h3>
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
                                </div>
                            </Modal>
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
                            <Modal className="start-end-time-selector" show={showEndTimeSelector} onClose={() => setShowEndTimeSelector(false)}>
                                <div className="time-selector">
                                    <h3>End Time</h3>
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
                                </div>
                            </Modal>
                        </div>
                        {submissionError && <p className="submission-error">Start date must come before end date!</p>}
                    </>
                }
            </div>
            <div className='event-time-info row all-day' onClick={() => {setAllDay(!allDay)}}>
                <div className="all-day-checkbox">{allDay && <p>&#10004;</p>}</div>
                <div>All Day</div>
            </div>
        </div>
    )
}

export default EventDateMenu