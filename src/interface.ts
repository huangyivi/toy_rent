/*
 * @Author: yivi 
 * @Date: 2021-12-05 14:00:23 
 * @Last Modified by: yivi
 * @Last Modified time: 2021-12-05 16:49:38
 */
/**
 * @description User-Service parameters
 */
export interface User {
  id: number;
  name: string;
}

export interface LoginInfo {
  username : string,
  password: string
}


export interface RegisterInfo {
  name: string;
  username: string;
}
 
export interface ResultInfo {
  success: boolean,
  message: string,
  data: any
}


export interface ChangeInfo {
  username: string;
  old_pwd: string;
  new_pwd: string;
}