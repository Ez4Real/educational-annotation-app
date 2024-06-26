const firebaseAuthErrorMessages: { [key: string]: string } = {
  'auth/invalid-credential': 'Incorrect email or password. Please, try again.',
  'auth/invalid-email': 'Email address is not valid.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'Email address is already in use by another account.',
  'auth/weak-password': 'Password should be at least 6 characters long.',
};
  
const defaultErrorMessage = 'Unexpected error occurred. Please, try again later.';
  

export const getAuthErrorMessage = (errorCode: string): string => {
    return firebaseAuthErrorMessages[errorCode] || defaultErrorMessage;
};