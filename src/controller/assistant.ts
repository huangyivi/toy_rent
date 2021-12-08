/*
 * @Description:
 * @Author: yivi
 * @Date: 2021-12-08 16:40:51
 * @LastEditors: yivi
 * @LastEditTime: 2021-12-08 16:43:02
 */

import {
  Controller,
  Inject,
  Provide,
  Post,
  Get,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { AssistantInfo, ResultInfo } from '../interface';
import { AssistantService } from '../service/assistant';

@Provide()
@Controller('/api/assistant')
export class AssistantController {
  @Inject()
  assistantService: AssistantService;

  @Get('/all')
  async getMembers(): Promise<ResultInfo> {
    return this.assistantService.getAssistant();
  }

  @Post('/add')
  async addAssistant(@Body(ALL) assistant: AssistantInfo): Promise<ResultInfo> {
    return this.assistantService.addAssistant(assistant);
  }

  @Post('/del')
  async delAssistant(@Body('id') id): Promise<ResultInfo> {
    return this.assistantService.delAssistant(id);
  }

  @Post('/search')
  async searchAssistant(
    @Body('condition') condition: string,
    @Body('value') value: string
  ): Promise<ResultInfo> {
    return this.assistantService.searchAssistant(condition, value);
  }
}
