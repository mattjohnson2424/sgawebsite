import { createContext } from "react";
export const CalendarContext = createContext({
    monthIndex: 0,
    setMonthIndex: index => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: index => {},
    daySelected: null,
    setDaySelected: day => {},
    showEventModal: false,
    setShowEventModal: () => {},
    events: [],
    setEvents: () => {},
    showSidebar: true,
    setShowSidebar: () => {},
    filteredEventTypes: [],
    setFilteredEventTypes: () => {},
    allDay: false,
    setAllDay: () => {},
    startTime: null,
    setStartTime: () => {},
    endTime: null,
    setEndTime: () => {},
    submissionError: false,
    setSumbissionError: () => {},
    filterExecOnly: true,
    setFilterExecOnly: () => {}
});
export default CalendarContext;