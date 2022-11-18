import CalendarContextWrapper from "../contexts/CalendarContextWrapper";
import "./Calendar.css"
import CalendarPage from "../components/calendar/CalendarPage";


export const Calendar = () => {

    return (
        <CalendarContextWrapper>
            <CalendarPage/>
        </CalendarContextWrapper>
    )
}

export default Calendar;