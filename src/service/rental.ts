/*
 * @Description: 出租表
 * @Author: yivi
 * @Date: 2021-12-06 20:31:43
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-06 20:41:51
 */

import { App, Provide } from '@midwayjs/decorator';
import { Application } from '@midwayjs/web';
import { RentalInfo, ResultInfo } from '../interface';
import Result from '../model/Result';

@Provide()
export class RentalService {
  @App()
  app: Application;

  async getRentals(): Promise<ResultInfo> {
    const res = await this.app.mysql.select('rental');
    return res !== null
      ? Result.success('查询成功！', res)
      : Result.error('查询失败！');
  }

  async addRental(rental: RentalInfo): Promise<ResultInfo> {
    try {
      await this.app.mysql.insert('rental', rental);
      return Result.success('添加成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('添加失败！');
    }
  }

  async delRental(id: number): Promise<ResultInfo> {
    try {
      await this.app.mysql.delete('rental', {
        r_id: id,
      });
      return Result.success('删除成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('删除失败！');
    }
  }

  async editRental(rental: RentalInfo): Promise<ResultInfo> {
    try {
      let {
        r_id,
        m_id,
        t_id,
        r_rent_date, // 出租的日期
        r_return_date, // 归还的日期
        s_rent_id, // 处理出租的人
        s_return_id
      } = rental;
      await this.app.mysql.update(
        'rental',
        {
          m_id,
          t_id,
          r_rent_date, // 出租的日期
          r_return_date, // 归还的日期
          s_rent_id, // 处理出租的人
          s_return_id
        },
        {
          where: {
            r_id,
          },
        }
      );
      return Result.success('修改成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('修改失败！');
    }
  }
}
