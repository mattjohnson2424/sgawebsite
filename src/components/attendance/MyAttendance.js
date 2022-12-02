import AttendanceInfo from "./AttendanceInfo";
import MeetingStatus from "./MeetingStatus";
import ServiceProjectStatus from "./ServiceProjectStatus";
import OtherEventsStatus from "./OtherEventsStatus";
import SchoolwideEventsStatus from "./SchoolwideEventsStatus";
import "./MyAttendance.css"

export const MyAttendance = ({ events }) => {

    return (
        <>
            <h2 className="my-attendance-title">Meetings</h2>
            <MeetingStatus events={events}/>
            <AttendanceInfo events={events} eventType={"meeting"}/>
            <h2 className="my-attendance-title">Service Projects</h2>
            <ServiceProjectStatus events={events}/>
            <AttendanceInfo events={events} eventType={"service-project"}/>
            <h2 className="my-attendance-title">Schoolwide Events</h2>
            <SchoolwideEventsStatus events={events}/>
            <AttendanceInfo events={events} eventType={"schoolwide"}/>
            <h2 className="my-attendance-title">Other Events</h2>
            <OtherEventsStatus events={events}/>
            <AttendanceInfo events={events} eventType={"other"}/>
        </>
    )

}

export default MyAttendance;