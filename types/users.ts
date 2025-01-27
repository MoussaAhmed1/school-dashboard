export interface ILogedUser {
  id: string;
  name: string;
  account: string;
  avatar: string;
  username: string;
  email: string;
  email_verified_at: any;
  phone: string;
  phone_verified_at: any;
  birth_date: string;
  gender: string;
  school_id: string;
  role: string;
  city_id: string;
  language: string;
  fcm_token: any;
  access_token: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  gender: "male" | "female";
  phone: string;
  avatar?: string;
  created_at: string;
  school?: School;
}
export interface IStudent {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  parent_id: string
  phone: string
  driver_id: string
  name: string
  gender: string
  birth_date: any
  avatar: string
  school_id: string
  school: School
  drivers: Driver[]
  parent: Parent
  grade: Grade
}
export interface Grade {
    id: string
    name: string
    order_by: number
    academic_stage: string
  
}
export interface School {
  id: string
  name: string
  avatar: string
}

export interface Driver {
  id: string
  name: string
  email: string
  avatar: string
  created_at: string
  school: any
}

export interface Parent {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  created_at: string
  school: any
}



export interface AccountProfile {
  premessions: string[];
  id: string;
  account: string;
  first_name: string;
  last_name: string;
  avatar: string;
  username: string;
  email: any;
  email_verified_at: any;
  phone: string;
  phone_verified_at: any;
  birth_date: string;
  gender: "male" | "female";
  language: string;
}

export interface ClientAddtionalInfo {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user_id: string;
  height: string;
  weight: string;
  allergic_reactions: string;
  notes: string;
}

export enum Role {
  "parents" = "PARENT",
  "drivers" = "DRIVER",
  "schools" = "SCHOOL",
  "security" = "SECURITY",
  "admins" = "ADMIN",
}

export interface FamilyMember {
  id: string;
  client_id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  kinship: string;
  birth_date: string;
  gender: string;
  height: string;
  weight: string;
  allergic_reactions: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

enum Kinship {
  Parent = "Parent",
  Child = "Child",
  Sibling = "Sibling",
  Spouse = "Spouse",
  Grandparent = "Grandparent",
  Grandchild = "Grandchild",
  UncleAunt = "UncleAunt",
  NieceNephew = "NieceNephew",
  Cousin = "Cousin",
  Other = "Other",
}

export default Kinship;

export interface ICity {
  id: string;
  name: string;
  code: string;
}