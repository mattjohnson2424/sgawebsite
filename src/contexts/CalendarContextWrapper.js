import { useEffect, useState } from "react"
import CalendarContext from "./CalendarContext"
import dayjs from "dayjs"

export const CalendarContextWrapper = props => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(null)

    useEffect(() => {
        setMonthIndex(smallCalendarMonth)
    }, [smallCalendarMonth])

    return (
        <CalendarContext.Provider 
            value={{ 
                monthIndex, 
                setMonthIndex, 
                smallCalendarMonth, 
                setSmallCalendarMonth ,
                daySelected,
                setDaySelected
        }}>
            {props.children}
        </CalendarContext.Provider>
    )
}

export default CalendarContextWrapper