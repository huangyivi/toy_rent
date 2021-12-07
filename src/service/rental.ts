/*
 * @Description: 出租表
 * @Author: yivi
 * @Date: 2021-12-06 20:31:43
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-07 21:40:16
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
    console.log('getRental');
    // const res = await this.app.mysql.select('rental');
    let sql =
      'SELECT r_id, r.m_id, m.m_name, r.t_id, t.t_name, r.r_rent_date, r.r_return_date, r.s_rent_id, a.s_name as s_rent_name, r.s_return_id, b.s_name as s_return_name FROM rental r LEFT JOIN member m ON r.m_id = m.m_id LEFT JOIN toy t ON r.t_id = t.t_id LEFT JOIN assistant a ON r.s_rent_id = a.s_id LEFT JOIN assistant b ON r.s_return_id = b.s_id;';
    const res = await this.app.mysql.query(sql);
    return res !== null
      ? Result.success('查询成功！', res)
      : Result.error('查询失败！');
  }

  async addRental(rental: RentalInfo): Promise<ResultInfo> {
    console.log('addRental:', rental);
    try {
      // 获取会员钱
      let { m_money } = await this.app.mysql.get('member', {
        m_id: rental.m_id,
      });
      // 获取玩具价格
      let { t_price } = await this.app.mysql.get('toy', {
        t_id: rental.t_id,
      });
      // 余额要大于价格
      if (m_money >= t_price) {
        await this.app.mysql.insert('rental', rental);
        await this.app.mysql.update(
          'toy',
          {
            t_out: '是',
          },
          {
            where: {
              t_id: rental.t_id,
            },
          }
        );
        await this.app.mysql.update('member', {
          m_money: m_money-t_price
        },{
          where: {
            m_id: rental.m_id
          }
        })
        return Result.success('添加成功！', null);
      }else {
        return Result.error('余额不足');
      }

    } catch (err) {
      console.log(err);
      return Result.error('添加失败！');
    }
  }

  async delRental(id: number): Promise<ResultInfo> {
    console.log('delRental:', id);
    try {
      let res = await this.app.mysql.select('rental', {
        where: {
          r_id: id,
        },
      });
      console.log(res);
      await this.app.mysql.delete('rental', {
        r_id: id,
      });
      await this.app.mysql.update(
        'toy',
        {
          t_out: '否',
        },
        {
          where: {
            t_id: res[0].t_id,
          },
        }
      );
      return Result.success('删除成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('删除失败！');
    }
  }

  async returnRental(r_id: number, s_id: number, date: string) {
    console.log('returnRental:', r_id, s_id, date);
    try {
      let {t_id,m_id} = await this.app.mysql.get('rental', {
          r_id: r_id,
        },
      );
      await this.app.mysql.update(
        'rental',
        {
          s_return_id: s_id,
          r_return_date: date,
        },
        {
          where: {
            r_id: r_id,
          },
        }
      );
      await this.app.mysql.update(
        'toy',
        {
          t_out: '否',
        },
        {
          where: {
            t_id: t_id,
          },
        }
      );
      let {m_points} = await this.app.mysql.get('member', {
        m_id : m_id
      })
      // 更新会员点数
      await this.app.mysql.update('member',{
        m_points: m_points+1
      }, {
        where : {
          m_id: m_id
        }
      })
      return Result.success('归还成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('归还失败！');
    }
  }

  async editRental(rental: RentalInfo): Promise<ResultInfo> {
    console.log('editRental:', rental);
    try {
      let {
        r_id,
        m_id,
        t_id,
        r_rent_date, // 出租的日期
        r_return_date, // 归还的日期
        s_rent_id, // 处理出租的人
        s_return_id,
      } = rental;
      await this.app.mysql.update(
        'rental',
        {
          m_id,
          t_id,
          r_rent_date, // 出租的日期
          r_return_date, // 归还的日期
          s_rent_id, // 处理出租的人
          s_return_id,
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
