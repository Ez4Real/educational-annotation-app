import { Timestamp } from "firebase/firestore";

export interface UserData {
    uid: string,
    email: string | null,
    role?: 'student' | 'teacher',
    firstName?: string,
    lastName?: string,
    createdAt: Timestamp
}

export interface User extends UserData {
    docId: string
}