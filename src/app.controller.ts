import { Controller, Request, Post, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('promote')
  promote(@Request() req) {
    return this.appService.promote(req.body);
  }

  @Get('webhook/:token/:pipelineId/:stagingId/:productionId')
  webhook(@Param() params) {
    return this.appService.promote(params);
  }

}
