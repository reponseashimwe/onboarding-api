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

export interface IProcess {
  pdfFile: any;
}

export interface FileRequest {
  [name: string]: File;
}

export interface EmployeeOnboardingInfo {
  personalDetails: {
    fullname: string | null;
    dob: string | null;
    maritalStatus: string | null;
    gender: string | null;
    carrerSummary: string | null;
  };
  contactDetails: {
    phoneNumber: string | null;
    emailAddress: string | null;
  };
  address?: {
    country: string | null;
    city: string | null;
    otherAddress: string | null;
  };
  educationalBackground?: {
    schoolName: string | null;
    period: string | null; // "from to month, year"
    details: string | null; // what was learned
  }[];
  experience?: {
    institution: string | null;
    period: string | null; // "from to month, year"
    title: string | null;
    details: string | null; // job responsibilities and achievements
  }[];
  skills: string[] | null;
  certifications: string[] | null;
  languages: string[] | null;
  socialMediaProfiles: {
    linkedIn?: string | null;
    github?: string | null;
    facebook?: string | null;
    instagram?: string | null;
  };
  salary?: string | null;
  startDate?: string | null;
  bankInfo?: {
    accountHolderName: string | null;
    accountNumber: string | null;
    bankName: string | null;
  };
}
