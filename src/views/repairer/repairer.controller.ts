import { Controller, Get, Query } from '@nestjs/common';
import { RepairerService } from './repairer.service';

@Controller('repairer')
export class RepairerController {
  constructor(
    private readonly repairerService: RepairerService
  ){}

  @Get('add')
  addRepairer(@Query() query) {
    return this.repairerService.addRepairer(query)
  }

  @Get('get')
  getRepairer(@Query() query) {
    return this.repairerService.getRepairer(query)
  }

  @Get('del')
  delRepairer(@Query() query) {
    return this.repairerService.delRepairer(query)
  }

  @Get('distribute')
  distribute(@Query() query) {
    return this.repairerService.distribute(query)
  }
}
