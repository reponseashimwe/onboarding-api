export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ILogin extends Pick<IUser, "email" | "password"> {}

export interface IJWTPayload {
  user?: IUser;
  accessToken: string;
}
