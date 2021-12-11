/*
 * @Description:
 * @Author: yivi
 * @Date: 2021-12-08 16:35:24
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-11 14:20:19
 */

import { App, Provide } from '@midwayjs/decorator';
import { Application } from '@midwayjs/web';
import { AssistantInfo, ResultInfo } from '../interface';
import Result from '../model/Result';

@Provide()
export class AssistantService {
  @App()
  app: Application;

  async getAssistant(): Promise<ResultInfo> {
    console.log('getAssistant');
    const res = await this.app.mysql.select('assistant', {
      where : {
        s_boss: 0
      }
    });
    return res !== null
      ? Result.success('查询成功！', res)
      : Result.error('查询失败！');
  }

  async addAssistant(assistant: AssistantInfo): Promise<ResultInfo> {
    console.log('addAssistant:', assistant);
    try {
      await this.app.mysql.insert('assistant', assistant);
      return Result.success('插入成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('插入失败！');
    }
  }

  async delAssistant(id: number): Promise<ResultInfo> {
    console.log('delAssistant:', id);
    try {
      await this.app.mysql.delete('assistant', {
        s_id: id,
      });
      return Result.success('删除成功！', null);
    } catch (err) {
      console.log(err);
      return Result.error('删除失败！');
    }
  }

  async searchAssistant(condition: string, value: string): Promise<ResultInfo> {
    console.log('searchAssistant:', condition, value);
    try {
      let sql = `select * from assistant where ${condition} like '%${value}%'`;
      let res = await this.app.mysql.query(sql);
      return Result.success('查询成功！', res);
    } catch (err) {
      console.log(err);
      return Result.error('查询失败！');
    }
  }
}
