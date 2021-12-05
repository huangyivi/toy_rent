/*
 * @Author: yivi 
 * @Date: 2021-12-05 16:44:52 
 * @Last Modified by: yivi
 * @Last Modified time: 2021-12-05 16:45:21
 */

import { ResultInfo } from "../interface"
export default class Result {
    static success(message:string,data:object):ResultInfo {
        return {
            success: true,
            message,
            data
        }
    }
    static error(message:string) : ResultInfo {
        return {
            success: false,
            message,
            data: null
        }
    }
}