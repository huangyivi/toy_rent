/*
 * @Author: yivi 
 * @Date: 2021-12-05 15:35:33 
 * @Last Modified by:   yivi 
 * @Last Modified time: 2021-12-05 15:35:33 
 */

import { Provide } from "@midwayjs/decorator";
import { Context, IMidwayWebNext, IWebMiddleware } from "@midwayjs/web";

@Provide()
export class ReportMiddleware implements IWebMiddleware {
    resolve() {
        let date = new Date();
        return async (ctx: Context,next: IMidwayWebNext) => {
            console.log('StartTime:',date.toString());
            // 这里指的是控制器逻辑
            await next();
        }
    }

}