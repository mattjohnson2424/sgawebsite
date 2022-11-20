import { useEffect, useState } from "react"
import CalendarContext from "./CalendarContext"
import dayjs from "dayjs"
import { query, collection, onSnapshot } from "@firebase/firestore"
import { db } from "../firebase"

export const CalendarContextWrapper = props => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [showEventModal, setShowEventModal] = useState(false)
    const [events, setEvents] = useState([])

    const calendarEventsInit = async () => {
        const q = query(collection(db, "calendar"))
        await onSnapshot(q, querySnapshot => {
            const dbEvents = []
            querySnapshot.forEach(doc => {
                dbEvents.push({
                    ...doc.data()
                })
            })
            setEvents(dbEvents)
        })
    }

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
        calendarEventsInit()
    }, [smallCalendarMonth])

    return (
        <CalendarContext.Provider 
            value={{ 
                monthIndex, 
                setMonthIndex, 
                smallCalendarMonth, 
                setSmallCalendarMonth,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                events,
                setEvents
            }
        }>
            {props.children}
        </CalendarContext.Provider>
    )
}

export default CalendarContextWrapper