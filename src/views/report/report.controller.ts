import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService
  ){}

  @Get('/')
  reportInfo(@Query() query){
    return this.reportService.reportInfo(query)
  }

  @Get('/getList')
  getReportInfo(@Query() query){
    return this.reportService.getReportInfo(query)
  }

  @Get('/evaluate')
  evaluate(@Query() query){
    return this.reportService.evaluate(query)
  }

  @Get('/done')
  done(@Query() query){
    return this.reportService.done(query)
  }
}
