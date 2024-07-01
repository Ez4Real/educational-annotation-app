import { Timestamp } from "firebase/firestore";

export interface UserData {
    uid: string,
    email: string | null,
    role?: string,
    firstName?: string,
    lastName?: string,
    createdAt: Timestamp
}
