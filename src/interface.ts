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
  username: string;
  password: string;
}

export interface RegisterInfo {
  name: string;
  username: string;
}

export interface ResultInfo {
  success: boolean;
  message: string;
  data: any;
}

export interface ChangeInfo {
  username: string;
  old_pwd: string;
  new_pwd: string;
}

export interface ToyInfo {
  t_id?: number;
  t_name: string;
  t_date: string;
  t_price: number;
  t_attach_num: number;
  t_state: number; // 状态，0~1
  t_out: string; // 是否出租
}

export interface MemberInfo {
  m_id?: number;
  m_name: string;
  m_addr: string;
  m_phone: string;
  m_enroll: string;
  m_points: number;
  m_money: number;
}


export interface RentalInfo {
  r_id?: number;
  m_id: number;
  t_id: number;
  r_rent_date: string; // 出租的日期
  r_return_date: string;  // 归还的日期
  s_rent_id: number; // 处理出租的人
  s_return_id: number;  // 处理归还的人
}


export interface AssistantInfo {
  s_name: string,
  s_username: string
}