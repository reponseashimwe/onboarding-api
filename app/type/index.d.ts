export type globalType = {
  app: string;
  value: string;
};

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  isDriver: boolean;
  isPharmacist: boolean;
  isSuperAdmin: boolean;

  driverDetails?: IDriverDetails;
}

export interface IDriverDetails {
  id: number;
  userId: number;
  driverNID: string;
  driverPlateNo: string;
  driverLicence: string;

  user?: IUser;
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
