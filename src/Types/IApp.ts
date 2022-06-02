export interface IUserData {
  name: string;
  lastName: string;
  password?: string;
  email?: string;
  dob?: string;
}

export interface IContext {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  userData: IUserData;
  setUserData: ({}: IUserData) => void;
}

export interface IReturnValue {
  user: IUser;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
}
