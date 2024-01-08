/* Roles */

export interface INewRolePermissions {
  id: number;
  isChecked: boolean;
}

export interface INewRole {
  description: string;
  name: string;
  active: boolean;
  permissions?: INewRolePermissions[];
}

export interface IUpdateRole {
  id: number;
  description: string;
  name: string;
  active: boolean;
  permissions?: INewRolePermissions[];
}

export interface ID {
  data: number;
}

/* Users */

export interface IUser {
  id:           number;
  userName:     string;
  email:        string;
  firstName:    string;
  lastName:     string;
  departament?: [];
  fkPermission: number;
  permission?:  string;
}
export interface IUpdateUser {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  rolesName: string[];
}
export interface INewUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  rolesName: string[];
  password: string;
  confirmPassword: string;
  changePassword: boolean;
  expirePassword: boolean;
  numberMonth: number;
  active: boolean;
}

export interface IChangePassword {
  userName: string;
  lastPassword: string;
  password: string;
  confirmPassword: string;
}
