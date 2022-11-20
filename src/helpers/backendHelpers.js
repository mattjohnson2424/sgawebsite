import { db } from '../firebase/index';
import { collection, addDoc, doc, getDoc, setDoc } from '@firebase/firestore';

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