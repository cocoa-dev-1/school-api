import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  getMain(): string {
    return this.mainService.getMain();
  }

  @Get('/school')
  getSchoolData(): object {
    return this.mainService.getSchoolData();
  }

  @Get('/today')
  getTodaysWork(): object {
    return this.mainService.getTodaysWork();
  }
}
