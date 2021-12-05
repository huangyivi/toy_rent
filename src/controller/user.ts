/*
 * @Description: 
 * @Author: yivi
 * @Date: 2021-12-05 14:04:03
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-05 17:06:36
 */


import {
  Provide,
  Post,
  Controller,
  Inject,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { ResultInfo, LoginInfo, RegisterInfo, ChangeInfo } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body(ALL) user: LoginInfo): Promise<ResultInfo> {
    return await this.userService.getUser(user);
  }

  @Post('/register')
  async register(@Body(ALL) user: RegisterInfo) {
    return await this.userService.addUser(user);
  }

  @Post('/changePwd')
  async changePwd(@Body(ALL) user: ChangeInfo) {
    return await this.userService.changePwd(user);
  }
}
