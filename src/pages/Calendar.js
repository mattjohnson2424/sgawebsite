import CalendarContextWrapper from "../contexts/CalendarContextWrapper";
import CalendarPage from "../components/calendar/CalendarPage";
import AddCalendarEvent from "../components/calendar/AddCalendarEvent";

export const Calendar = () => {
    return (
        <CalendarContextWrapper>
            <AddCalendarEvent/>
            <CalendarPage/>
        </CalendarContextWrapper>
    )
}

export default Calendar;