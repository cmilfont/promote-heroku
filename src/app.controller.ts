import { Controller, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('promote')
  promote(@Request() req) {
    return this.appService.promote(req.body);
  }
}
