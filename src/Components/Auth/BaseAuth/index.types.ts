import { ReactNode } from 'react'
import { UserInfo } from '../../../Pages/SignUp/index.type'
import { UserCredential } from 'firebase/auth'


export type SubmitAction = (
  email: string,
  password: string,
  userData?: UserInfo
) => Promise<UserCredential | void>;

export interface BaseAuthProps {
  actionType: 'login' | 'signup';
  title: string;
  switchAuthEl: ReactNode;
  submitAction: SubmitAction;
  confirmPasswordValue?: string;
  confirmPasswordFormGroup?: ReactNode;
  submitButtonText: string;
  expandableSignupEl?: ReactNode;
}