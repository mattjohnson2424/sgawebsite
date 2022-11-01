import { db } from '../firebase/index';
import { collection, addDoc } from '@firebase/firestore';
import { getDocs } from 'firebase/firestore';

const announcementsRef = collection(db, 'announcements');
const attendanceRef = collection(db, 'attendance');
const eventsRef = collection(db, 'events');
const studentsRef = collection(db, 'students');

// Functional
export const getEvents = async () => {
    const events = [];
    const snapshot = await getDocs(eventsRef);
    snapshot.forEach(event => {
        events.push(event.data())
    });
    return events;
}

// Functional
export const addEvent = async event => {
    const eventRef = await addDoc(eventsRef, event);
    return eventRef;
}

// Functional
export const getAnnouncements = async () => {
    const announcements = [];
    const snapshot = await getDocs(announcementsRef);
    snapshot.forEach(announcement => {
        announcements.push(announcement.data())
    });
    return announcements;
}

// Functional
export const addAnnouncement = async announcement => {
    const announcementRef = await addDoc(announcementsRef, announcement);
    return announcementRef;
}

// Functional
export const getStudents = async () => {
    const students = [];
    const snapshot = await getDocs(studentsRef);
    snapshot.forEach(student => {
        students.push(student.data())
    });
    return students;
}

// Functional
export const addAttendance = async (name, date) => {
    const students = await getStudents();
    const attendees = []
    students.forEach(student => {
        attendees.push({
            firstName: student.firstName,
            lastName: student.lastName,
            grade: student.grade,
            atttended: false
        })
    })

    const attendanceEventRef = await addDoc(attendanceRef, {
        name: name,
        date: date,
        attendees: attendees
    });
    return attendanceEventRef;
}

export const getAttendance = async () => {
    const attendance = [];
    const snapshot = await getDocs(attendanceRef);
    snapshot.forEach(attend => {
        attendance.push(attend.data())
    });
    return attendance;
}