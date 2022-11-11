import { db } from '../firebase/index';
import { collection, addDoc, doc, getDoc, setDoc, query, onSnapshot, updateDoc, deleteField } from '@firebase/firestore';

const announcementsRef = collection(db, 'announcements');
const usersRef = collection(db, 'users');

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

export const refreshEventUsers = async () => {

    const dbEvents = []
    const eventQuery = query(collection(db, "events"));
    await onSnapshot(eventQuery, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            dbEvents.push({
                ...doc.data(),
                id: doc.id
            })
        })
        
    })

    const userQuery = query(collection(db, "users"));
    await onSnapshot(userQuery, async querySnapshot => {
        const users = []
        querySnapshot.forEach(user => {
            users.push({
                id: user.id,
                ...user.data()
            })
        })
        dbEvents.forEach(async event => {

            const eventAttendanceKeys = Object.keys(event.attendance)

            // for users that have newly been created
            users.filter(user => !eventAttendanceKeys.includes(user.id)).forEach(async user => {
                await updateDoc(doc(db, 'events', event.id), {
                    [`attendance.${user.id}`]: {
                        ...user,
                        present: false
                    }
                })
            })

            // for users that have been recently deleted
            const userIds = []
            users.forEach(user => {
                userIds.push(user.id)
            })

            eventAttendanceKeys.filter(key => !userIds.includes(key)).forEach(async key => {
                await updateDoc(doc(db, 'events', event.id), {
                    [`attendance.${key}`]: deleteField()
                })
            })


            // ! do this same thing with event sign-ups

        })           
    })       
}

