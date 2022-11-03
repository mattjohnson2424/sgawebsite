import { db } from '../firebase/index';
import { collection, addDoc, query } from '@firebase/firestore';
import { doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

const announcementsRef = collection(db, 'announcements');
const eventsRef = collection(db, 'events');
const usersRef = collection(db, "users");

// Functional
export const addAnnouncement = async announcement => {
    const announcementRef = await addDoc(announcementsRef, announcement);
    return announcementRef;
}

// Functional
export const addUser = async (id, user) => {
    const docRef = await setDoc(doc(usersRef, id), user)
    return docRef;
}

// Functional
export const getUser = async id => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
}

// Functional
export const addEvent = async doc => {

    const eventRef = await addDoc(eventsRef, {
        ...doc
    });
    return eventRef;
}

export const addEventAttendance = async() => {
    const students = await getUsers();
    const attendees = []
    students.forEach(user => {
        attendees.push({
            firstName: user.firstName,
            lastName: user.lastName,
            grade: user.grade,
            atttended: false
        })
    })
}

// Functional
export const getEvents = async () => {
    const q = query(eventsRef);
    await onSnapshot(q, (querySnapshot) => {
        const events = [];
        querySnapshot.forEach(doc => {
            events.push(doc.data())
        })
        return events;
    })
}

export const updateEvent = async (id, updateField) => {
    await updateDoc(doc(db, 'events', id), updateField);
}

/* EVERYTHING ABOVE THIS WORKS
 */

// Functional
// ! doesnt use useSnapshot
export const getUsers = async () => {
    const users = [];
    const snapshot = await getDocs(usersRef);
    snapshot.forEach(user => {
        users.push(user.data())
    });
    return users;
}