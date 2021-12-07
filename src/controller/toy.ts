/*
 * @Description:
 * @Author: yivi
 * @Date: 2021-12-06 20:14:23
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-07 20:37:31
 */

import { ALL, Body, Controller, Get, Inject, Post, Provide } from '@midwayjs/decorator';
import { ResultInfo, ToyInfo } from '../interface';
import { ToyService } from '../service/toy';

@Provide()
@Controller('/api/toy')
export class ToyController {
  @Inject()
  toyService: ToyService;

  @Get('/all')
  async getToys(): Promise<ResultInfo> {
    return this.toyService.getToys();
  }


  @Post('/add')
  async addToy(@Body(ALL) toy: ToyInfo): Promise<ResultInfo> {
      return this.toyService.addToy(toy);
  }

  @Post('/del')
  async delToy(@Body("id") id): Promise<ResultInfo> {
      return this.toyService.delToy(id);
  }

  @Post('/edit')
  async editToy(@Body(ALL) toy: ToyInfo): Promise<ResultInfo> {
      return this.toyService.editToy(toy);
  }

  @Post('/search')
  async searchToy(@Body("condition") condition: string,@Body('value') value: string) : Promise<ResultInfo> {
    return this.toyService.searchToy(condition,value);
  }
  
  @Get('/free')
  async getFree(): Promise<ResultInfo> {
    return this.toyService.getFree();
  }
}
