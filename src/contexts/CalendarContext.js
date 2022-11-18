import { createContext } from "react";
export const CalendarContext = createContext({
    monthIndex: 0,
    setMonthIndex: index => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: index => {},
    daySelected: null,
    setDaySelected: day => {}
});
export default CalendarContext;