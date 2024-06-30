import { ReactNode } from 'react'
import { UserData } from '../SignUp/index.type'
import { UserCredential } from 'firebase/auth'

export type SubmitAction = (
  email: string,
  password: string,
  userData?: UserData | undefined
) => Promise<UserCredential | any>

export interface BaseAuthProps {
  actionType: string
  title: string
  switchAuthEl: ReactNode
  submitAction: SubmitAction
  confirmPasswordValue?: string
  confirmPasswordFormGroup?: ReactNode
  submitButtonText: string
  expandableSignupEl?: ReactNode
}