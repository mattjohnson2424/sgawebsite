import AttendanceInfo from "./AttendanceInfo";
import MeetingStatus from "./MeetingStatus";
import ServiceProjectStatus from "./ServiceProjectStatus";
import OtherEventsStatus from "./OtherEventsStatus";
import SchoolwideEventsStatus from "./SchoolwideEventsStatus";
import "./MyAttendance.css"

export const MyAttendance = () => {

    return (
        <>
            <h2 className="my-attendance-title">Meetings</h2>
            <MeetingStatus/>
            <AttendanceInfo eventType={"meeting"}/>
            <h2 className="my-attendance-title">Service Projects</h2>
            <ServiceProjectStatus/>
            <AttendanceInfo eventType={"service-project"}/>
            <h2 className="my-attendance-title">Schoolwide Events</h2>
            <SchoolwideEventsStatus/>
            <AttendanceInfo eventType={"schoolwide"}/>
            <h2 className="my-attendance-title">Other Events</h2>
            <OtherEventsStatus/>
            <AttendanceInfo eventType={"other"}/>
        </>
    )

}

export default MyAttendance;