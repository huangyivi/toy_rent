/*
 * @Author: yivi
 * @Date: 2021-12-05 14:07:54
 * @Last Modified by: yivi
 * @Last Modified time: 2021-12-Su 04:52:56
 */

import { App, Provide } from '@midwayjs/decorator';
import { Application } from '@midwayjs/web';
import { LoginInfo, RegisterInfo, ResultInfo, ChangeInfo } from '../interface';
import Result from '../model/Result';
@Provide()
export class UserService {
  @App()
  app: Application;

  /**
   * @description: 登录逻辑
   * @param {LoginInfo} options
   * @return {*}
   */
  async getUser(options: LoginInfo): Promise<ResultInfo> {
    let { username, password } = options;
    const user = await this.app.mysql.get('assistant', {
      s_username: username,
    });
    if (user != null) {
      return user.s_password === password
        ? Result.success('登录成功', user)
        : Result.error('用户密码错误');
    }
    return Result.error('用户不存在');
  }

  /**
   * @description: 添加用户
   * @param {RegisterInfo} options
   * @return {*}
   */
  async addUser(options: RegisterInfo): Promise<ResultInfo> {
    let { name, username } = options;
    try {
      await this.app.mysql.insert('assistant', {
        s_name: name,
        s_username: username,
        s_password: '123456',
      });
      return Result.success('插入用户成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('用户已经存在');
    }
  }

  /**
   * @description: 修改密码
   * @param {ChangeInfo} options
   * @return {*}
   */
  async changePwd(options: ChangeInfo) {
    let { username, old_pwd, new_pwd } = options;
    const user = await this.app.mysql.get('assistant', {
      s_username: username,
    });
    if (user !== null) {
      if (user.s_password === old_pwd) {
        try {
          await this.app.mysql.update(
            'assistant',
            {
              s_password: new_pwd,
            },
            {
              where: {
                s_username: username
              },
            }
          );
          return Result.success('修改成功！', null);
        } catch (err) {
          console.log(err);
          return Result.error('修改失败！');
        }
      } else {
        return Result.error('原密码错误');
      }
    } else {
      return Result.error('用户不存在');
    }
  }
}
