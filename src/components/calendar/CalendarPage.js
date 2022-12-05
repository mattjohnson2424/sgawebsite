import { useState, useContext, useEffect } from "react"
import { getMonth } from "../../helpers/calendarHelpers";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import CalendarContext from "../../contexts/CalendarContext";
import "./CalendarPage.css"


export const CalendarPage = () => {

    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const { monthIndex, showSidebar } = useContext(CalendarContext)

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])

    return (
        <div className="calendar-wrapper">
            <CalendarHeader/>
            <div className="sidebar-month">
                {showSidebar && <Sidebar/>}
                <Month month={currentMonth}/>
            </div>
        </div>
    )
}

export default CalendarPage;