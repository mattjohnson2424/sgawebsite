import dayjs from "dayjs"
import { useContext } from "react"
import CalendarContext from "../../contexts/CalendarContext"

export const CalendarHeader = () => {

    const { monthIndex, setMonthIndex} = useContext(CalendarContext)

    return (
        <header className="calendar-header">
            <h1>Calendar</h1>
            <button onClick={e => setMonthIndex(dayjs().month())}>Today</button>
            <button onClick={e => setMonthIndex(monthIndex - 1)}>
                &lsaquo;
            </button>
            <button onClick={e => setMonthIndex(monthIndex + 1)}>
                &rsaquo;
            </button>
            <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
        </header>
    )
}

export default CalendarHeader