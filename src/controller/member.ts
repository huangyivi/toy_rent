/*
 * @Description: 
 * @Author: yivi
 * @Date: 2021-12-06 20:40:44
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-06 20:40:44
 */
import { ALL, Body, Controller, Get, Inject, Post, Provide } from '@midwayjs/decorator';
import { ResultInfo, MemberInfo } from '../interface';
import { MemberService } from '../service/member';

@Provide()
@Controller('/api/member')
export class MemberController {
  @Inject()
  memberService: MemberService;

  @Get('/all')
  async getMembers(): Promise<ResultInfo> {
    return this.memberService.getMembers();
  }


  @Post('/add')
  async addMember(@Body(ALL) member: MemberInfo): Promise<ResultInfo> {
      return this.memberService.addMember(member);
  }

  @Post('/del')
  async delMember(@Body("id") id): Promise<ResultInfo> {
      return this.memberService.delMember(id);
  }

  @Post('/edit')
  async editMember(@Body(ALL) member: MemberInfo): Promise<ResultInfo> {
      return this.memberService.editMember(member);
  }
  
}