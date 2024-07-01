import { auth } from "./firebase"
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    UserCredential
} from 'firebase/auth'


export const signUpUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password)
}


export const signInUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | void> => {
    return await signInWithEmailAndPassword(auth, email, password)
}


export const signInWithGoogle = async (): Promise<UserCredential | void> => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result
}


export const signOutUser = async (): Promise<void> => {
    await signOut(auth)
}