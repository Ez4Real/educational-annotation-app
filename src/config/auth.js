import { auth } from "./firebase"
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth'

export const signUpUserWithEmailAndPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    // result.user
    return result
}

export const signOutUser = async () => {
    return await signOut(auth)
}


// export const sendPasswordResetEmail = (email) => {
//     return sendPasswordResetEmail(email);
//   };
  
// export const updatePassword = (password) => {
//     return updatePassword(auth.currentUser, password);
// };

// export const sendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// };