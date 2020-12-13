import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repairer } from 'src/entity/repairer.entity';
import { Report } from 'src/entity/report.entity';
import { GetRepairer, RepairerType, DelRepairer, Distribute } from 'src/interface/repairerType';
import { Repository } from 'typeorm';

@Injectable()
export class RepairerService {
  constructor(
    @InjectRepository(Repairer)
    private readonly repairerRepository: Repository<Repairer>,

    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>
  ) { }

  // 添加维修员
  async addRepairer(query: RepairerType) {
    const repairer = await this.repairerRepository.findOne({ repairName: query.repairName })
    if (repairer) return { code: 0, success: false }
    await this.repairerRepository.save(query)
    return { code: 1, success: true }
  }

  // 获取维修员
  async getRepairer(query: GetRepairer) {
    let repairers = []
    query.repairType ?
      repairers = await this.repairerRepository.find({ repairType: query.repairType }) :
      repairers = await this.repairerRepository.find()
    return { code: 1, success: true, data: repairers }
  }

  // 删除维修员
  async delRepairer(query: DelRepairer) {
    const repairer = await this.repairerRepository.findOne({ id: query.id })
    if (!repairer) return { code: 0, success: false }
    await this.repairerRepository.delete(query.id)
    return { code: 1, success: true }
  }

  // 分配任务
  async distribute(query: Distribute) {
    const { repairName, repairNumber } = query
    const report = await this.reportRepository.findOne({ repairNumber })
    if (!report) return { code: 0, success: false }
    await this.reportRepository.update(report, { repairName, faultStatus: 2 })
    return { code: 1, success: true }
  }
}
