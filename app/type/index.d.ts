export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  isHR: boolean;
  isSuperAdmin: boolean;
  organizationId: number | null;
  createdAt: Date;

  organization?: IOrganization;
}

export interface IOrganization {
  id: number;
  name: string;
  domain: string;
  createdAt: Date;
  hrId: number | null;

  hrManager?: IUser;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

export interface IUserCreate
  extends Pick<
    IUser,
    "name" | "email" | "password" | "phone" | "organizationId"
  > {}
export interface IRegister
  extends Pick<IUser, "name" | "email" | "password" | "phone"> {
  organizationData: {
    name: string;
    domain: string;
    hrId: number | null;
  };
}

export interface ILogin extends Pick<IUser, "email" | "password"> {}

export interface IJWTPayload {
  user?: IUser;
  accessToken: string;
}

export interface IRoleCreate extends Pick<IRole, "name" | "description"> {}
export interface IOrganizationCreate
  extends Pick<IOrganization, "name" | "domain" | "hrId"> {}
