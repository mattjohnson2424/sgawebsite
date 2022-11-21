import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import CalendarContext from "../../contexts/CalendarContext"
import { getTimes, getTimeDifference } from "../../helpers/timeHelpers"

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
        <>
            <div className="add-event-time-info row">
                <div className="event-time-info">{dayjs(daySelected).format("dddd, MMMM DD")}</div>
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
                        {submissionError && "Start date must come before end date"}
                    </>
                }
            </div>
            <div className='event-time-info row all-day' onClick={() => {setAllDay(!allDay)}}>
                <div className="all-day-checkbox">{allDay && <p>&#10004;</p>}</div>
                <div>All Day</div>
            </div>
        </>
    )
}

export default EventDateMenu