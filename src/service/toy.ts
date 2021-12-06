/*
 * @Description:
 * @Author: yivi
 * @Date: 2021-12-06 19:57:10
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-06 20:23:00
 */

import { App, Provide } from '@midwayjs/decorator';
import { Application } from '@midwayjs/web';
import { ResultInfo, ToyInfo } from '../interface';
import Result from '../model/Result';

@Provide()
export class ToyService {
  @App()
  app: Application;

  /**
   * 获取玩具列表
   * @returns
   */
  async getToys(): Promise<ResultInfo> {
    const res = await this.app.mysql.select('toy');
    return res !== null
      ? Result.success('查询成功！', res)
      : Result.error('查询失败！');
  }

  async addToy(toy: ToyInfo): Promise<ResultInfo> {
    try {
      await this.app.mysql.insert('toy', toy);
      return Result.success('插入成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('插入失败！');
    }
  }

  async delToy(id: number): Promise<ResultInfo> {
    try {
      await this.app.mysql.delete('toy', {
        t_id: id,
      });
      return Result.success('删除成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('删除失败！');
    }
  }

  async editToy(toy: ToyInfo): Promise<ResultInfo> {
    try {
      let { t_id, t_name, t_date, t_price, t_attach_num, t_state, t_out } = toy;
      await this.app.mysql.update(
        'toy',
        {
          t_name,
          t_date,
          t_price,
          t_attach_num,
          t_state,
          t_out,
        },
        {
          where: {
              t_id
          }
        }
      );
      return Result.success('修改成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('修改失败！');
    }
  }



}
