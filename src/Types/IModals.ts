export interface IModalProps {
  open: (() => void) | boolean;
  onClose: () => void;
}

export interface IRegisterReturn {
  auth_token: string;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IGetMyPersonalData {
  user: IMyPersonalInfo;
}

export interface IMyPersonalInfo {
  id: number;
  first_name: string;
  last_name: string;
}
