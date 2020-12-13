import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/entity/report.entity';
import { Evaluate, GetReportInfo, ReportType } from 'src/interface/reportType';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>
  ) { }

  // 用户报修
  async reportInfo(query: ReportType) {
    const date = new Date()
    const repairNumber = date.getTime().toString()
    await this.reportRepository.save({
      ...query,
      faultStatus: 1,
      repairEvaluate: 0,
      repairName: '',
      repairNumber
    })
    return { code: 1, success: true }
  }

  // 获取用户上报信息
  async getReportInfo(query: GetReportInfo) {
    const { faultStatus, userName, repairNumber } = query
    let reportInfos = []
    userName ? 
      (
        faultStatus ?
        reportInfos = await this.reportRepository.find({ userName, faultStatus }) :
        reportInfos = await this.reportRepository.find({ userName })
      ) : 
      (
        faultStatus ?
        reportInfos = await this.reportRepository.find({ faultStatus }) :
        reportInfos = await this.reportRepository.find()
      )
    if (repairNumber) return { code: 1, success: true, data: await this.reportRepository.findOne({ repairNumber }) }

    return { code: 1, success: true, data: reportInfos }
  }

  // 用户评价
  async evaluate(query: Evaluate) {
    const { repairNumber, repairEvaluate } = query
    const repair = await this.reportRepository.findOne({ repairNumber })
    if (!repair) return { code: 0, success: false }
    await this.reportRepository.update({ repairNumber }, { repairEvaluate })
    return { code: 1, success: true }
  }

  // 用户已解决提交
  async done(query: { repairNumber: string }) {
    const repair = await this.reportRepository.findOne({ repairNumber: query.repairNumber })
    if (!repair) return { code: 0, success: false }
    await this.reportRepository.update(repair, { faultStatus: 3 })
    return { code: 1, success: true }
  }
}
