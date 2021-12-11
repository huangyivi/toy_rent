/*
 * @Description: 
 * @Author: yivi
 * @Date: 2021-12-06 20:42:02
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-11 14:27:54
 */

import { ALL, Body, Controller, Get, Inject, Post, Provide } from '@midwayjs/decorator';
import { ResultInfo, RentalInfo } from '../interface';
import { RentalService } from '../service/rental';

@Provide()
@Controller('/api/rental')
export class RentalController {
  @Inject()
  rentalService: RentalService;

  @Get('/all')
  async getRentals(): Promise<ResultInfo> {
    return this.rentalService.getRentals();
  }


  @Post('/add')
  async addRental(@Body(ALL) rental: RentalInfo): Promise<ResultInfo> {
      return this.rentalService.addRental(rental);
  }

  @Post('/del')
  async delRental(@Body("id") id): Promise<ResultInfo> {
      return this.rentalService.delRental(id);
  }

  @Post('/edit')
  async editRental(@Body(ALL) rental: RentalInfo): Promise<ResultInfo> {
      return this.rentalService.editRental(rental);
  }

  @Post('/return')
  async returnRental(@Body('r_id') r_id: number, @Body('s_id') s_id: number, @Body('date') date: string): Promise<ResultInfo> {
    return this.rentalService.returnRental(r_id,s_id,date);
  }
  
}