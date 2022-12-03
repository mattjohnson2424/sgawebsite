import dayjs from "dayjs"
import { useContext } from "react"
import CalendarContext from "../../contexts/CalendarContext"
import "./CalendarHeader.css"

export const CalendarHeader = () => {

    const { monthIndex, setMonthIndex, showSidebar, setShowSidebar } = useContext(CalendarContext)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <header className="calendar-header">
            <button className="toggle-sidebar" onClick={toggleSidebar}>|||</button>
            <h1 className="calendar-title">Calendar</h1>
            <div className="header-date-change">
                <button className="select-today"onClick={() => setMonthIndex(dayjs().month())}>Today</button>
                <button className="change-month" onClick={() => setMonthIndex(monthIndex - 1)}>
                    &lsaquo;
                </button>
                <button className="change-month" onClick={() => setMonthIndex(monthIndex + 1)}>
                    &rsaquo;
                </button>
            </div>
            <h2 className="header-month-selected">{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
        </header>
    )
}

export default CalendarHeader