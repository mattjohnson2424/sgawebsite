import { useEffect, useState } from "react"
import CalendarContext from "./CalendarContext"
import dayjs from "dayjs"
import { query, collection, onSnapshot } from "@firebase/firestore"
import { db } from "../firebase"
import { eventTypes } from "../helpers/eventTypes"

export const CalendarContextWrapper = props => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [showEventModal, setShowEventModal] = useState(false)
    const [events, setEvents] = useState([])
    const [showSidebar, setShowSidebar] = useState(true)
    const [filteredEventTypes, setFilteredEventTypes] = useState(eventTypes)
    const [allDay, setAllDay] = useState(false)
    const [startTime, setStartTime] = useState("12:00am") //dayjs().format("h:00a")
    const [endTime, setEndTime] = useState("1:00am") // dayjs().format(`${parseInt(dayjs().format("h")) + 1}:00a`)
    const [submissionError, setSumbissionError] = useState(false)
    const [filterExecOnly, setFilterExecOnly] = useState(true)

    const calendarEventsInit = async () => {
        const q = query(collection(db, "calendar"))
        await onSnapshot(q, querySnapshot => {
            const dbEvents = []
            querySnapshot.forEach(doc => {
                dbEvents.push({
                    ...doc.data(),
                    id: doc.id
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
                setEvents,
                showSidebar,
                setShowSidebar,
                filteredEventTypes,
                setFilteredEventTypes,
                allDay,
                setAllDay,
                startTime,
                setStartTime,
                endTime,
                setEndTime,
                submissionError,
                setSumbissionError,
                filterExecOnly,
                setFilterExecOnly
            }
        }>
            {props.children}
        </CalendarContext.Provider>
    )
}

export default CalendarContextWrapper