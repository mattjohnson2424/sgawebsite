import React, { useState, useEffect, useContext } from 'react'
import dayjs from "dayjs"
import { getMonth } from "../../helpers/calendarHelpers"
import CalendarContext from '../../contexts/CalendarContext'
import "./SmallCalendar.css"

export const SmallCalendar = () => {

    const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected} = useContext(CalendarContext)

    const getDayClass = day => {
        const format = "DD-MM-YY"
        const today = dayjs().format(format)
        const currentDay = dayjs(day).format(format)
        const selectedDay = daySelected && dayjs(daySelected).format(format)

        if (today === currentDay) {
            return "small-calendar-current-day"
        } else if (currentDay === selectedDay) {
            return "small-calendar-selected-day"
        } else {
            return ""
        }
    }

    useEffect(() => {
        setCurrentMonthIndex(monthIndex)
    }, [monthIndex])

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIndex))
    }, [currentMonthIndex])

    return (
        <div className="small-calendar-menu">
            <header className='small-calendar-header'>
                <p className='current-month'>
                    {dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MMMM YYYY")}
                </p>
                <div className='change-small-month'>
                    <button className="change-small-month-btn"onClick={e => setCurrentMonthIndex(currentMonthIndex - 1)}>
                        &lsaquo;
                    </button>
                    <button className="change-small-month-btn"onClick={e => setCurrentMonthIndex(currentMonthIndex + 1)}>
                        &rsaquo;
                    </button>
                </div>
            </header>
            <table className="small-calendar">
                <thead>
                    <tr>
                        {currentMonth[0].map((day, index) => (
                            <td key={index} className="small-calendar-weekdays">
                                {dayjs(day).format("dd").charAt(0)}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentMonth.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, dayIndex) => (
                                <td key={dayIndex}>
                                    <button  
                                        className={`small-calendar-button ${getDayClass(day)}`}
                                        onClick={() => {
                                            setSmallCalendarMonth(currentMonthIndex)
                                            setDaySelected(day)
                                        }}
                                    >
                                        <span className='small-calendar-text'>{dayjs(day).format("D")}</span>
                                    </button>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SmallCalendar