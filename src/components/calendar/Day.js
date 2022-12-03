import dayjs from "dayjs";
import { useContext } from "react";
import CalendarContext from "../../contexts/CalendarContext";
import UserContext from "../../contexts/UserContext";
import CalendarEvent from "./CalendarEvent";
import "./Day.css"

export const Day = ({ day, weekIndex }) => {

    const { setDaySelected, setShowEventModal, events, filteredEventTypes } = useContext(CalendarContext)
    const user = useContext(UserContext)

    const getCurrentDayClass = () => {
        return dayjs(day).format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'current-day' : ''
    }

    return (
        <div className="day">
            <header className="date-header">
                {weekIndex === 0 && <p className="date-day">{dayjs(day).format("ddd").toUpperCase()}</p> }
                
                <p className={`date-num ${getCurrentDayClass()}`}>
                    {dayjs(day).format("DD")}
                </p>
            </header>
            <div className="calendar-event-list">
                {events.filter(event => {
                    return event.date === dayjs(day).format("MM-DD-YYYY") && 
                    filteredEventTypes.includes(event.eventType)
                }).map((event, index) => (
                    <CalendarEvent key={index} event={event}/>
                ))}
            </div>
            {user.admin && 
                <div className="add-calendar-event-by-day" onClick={() => {
                    setDaySelected(day)
                    setShowEventModal(true)
                }}></div>
            }
            
        </div>
    )
}

export default Day