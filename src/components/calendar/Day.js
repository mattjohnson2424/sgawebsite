import dayjs from "dayjs";
import { useContext } from "react";
import CalendarContext from "../../contexts/CalendarContext";

export const Day = ({ day, weekIndex }) => {

    const { setDaySelected, setShowEventModal, events } = useContext(CalendarContext)

    const getCurrentDayClass = () => {
        return dayjs(day).format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'current-day' : ''
    }

    return (
        <div className="day" onClick={() => {
            setDaySelected(day)
            setShowEventModal(true)
        }}>
            <header className="date-header">
                {weekIndex === 0 && <p className="date-day">{dayjs(day).format("ddd").toUpperCase()}</p> }
                
                <p className={`date-num ${getCurrentDayClass()}`}>
                    {dayjs(day).format("DD")}
                </p>
            </header>
            <div className="calendar-event-list">
                {events.filter(event => (event.date === dayjs(day).format("MM-DD-YYYY"))).map((event, index) => (
                    <div key={index} className="calendar-event" style={{ backgroundColor: event.color }}>{event.title}</div>
                ))}
            </div>
        </div>
    )
}

export default Day