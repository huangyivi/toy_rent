/*
 * @Description:
 * @Author: yivi
 * @Date: 2021-12-06 19:57:10
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-07 19:29:55
 */

import { App, Provide } from '@midwayjs/decorator';
import { Application } from '@midwayjs/web';
import { ResultInfo, MemberInfo } from '../interface';
import Result from '../model/Result';

@Provide()
export class MemberService {
  @App()
  app: Application;

  /**
   * 获取玩具列表
   * @returns
   */
  async getMembers(): Promise<ResultInfo> {
    console.log('getMember')
    const res = await this.app.mysql.select('member');
    return res !== null
      ? Result.success('查询成功！', res)
      : Result.error('查询失败！');
  }

  async addMember(member: MemberInfo): Promise<ResultInfo> {
    console.log('addMember:',member);
    try {
      await this.app.mysql.insert('member', member);
      return Result.success('插入成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('插入失败！');
    }
  }

  async delMember(id: number): Promise<ResultInfo> {
    console.log('delMember:',id);
    try {
      await this.app.mysql.delete('member', {
        m_id: id,
      });
      return Result.success('删除成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('删除失败！');
    }
  }

  async editMember(member: MemberInfo): Promise<ResultInfo> {
    console.log('editMember:',member);
    try {
      let { m_id, m_name, m_addr, m_phone, m_enroll, m_points, m_money } =
        member;
      await this.app.mysql.update(
        'member',
        {
          m_name, m_addr, m_phone, m_enroll, m_points, m_money
        },
        {
          where: {
            m_id
          },
        }
      );
      return Result.success('修改成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('修改失败！');
    }
  }


  async searchMember(condition:string,value:string): Promise<ResultInfo> {
    console.log('searchMember:',condition,value);
    if(condition === 'm_name' || condition === 'm_enroll') {
      try {
        let sql = `select * from member where ${condition} like '%${value}%'`;
        let res = await this.app.mysql.query(sql);
        return Result.success('查询成功！',res);
      }catch(err) {
        console.log(err);
        return Result.error('查询失败！');
      }
    }else {
      try {
        let sql = `select * from member where ${condition}='${value}'`;
        let res = await this.app.mysql.query(sql);
        return Result.success('查询成功！',res);
      }catch(err) {
        console.log(err);
        return Result.error('查询失败！');
      }
    }
    
  }
}
