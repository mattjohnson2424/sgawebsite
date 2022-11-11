import AttendanceInfo from "./AttendanceInfo";
import MeetingStatus from "./MeetingStatus";
import ServiceProjectStatus from "./ServiceProjectStatus";
import OtherEventsStatus from "./OtherEventsStatus";

export const MyAttendance = () => {

    return (
        <>
            <h1>My Attendance</h1>
            <h2>Meetings</h2>
            <MeetingStatus/>
            <AttendanceInfo eventType={"meeting"}/>
            <h2>Service Projects</h2>
            <ServiceProjectStatus/>
            <AttendanceInfo eventType={"service-project"}/>
            <h2>Other Events</h2>
            <OtherEventsStatus/>
            <AttendanceInfo eventType={"other"}/>
        </>
    )

}

export default MyAttendance;