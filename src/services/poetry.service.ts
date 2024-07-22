import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poetry } from 'src/entities/poetry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PoetryService {
  constructor(
    @InjectRepository(Poetry)
    private poetryRepository: Repository<Poetry>,
  ) {}

  /**
   * 随机获取一首诗词
   * @returns
   */
  async findOneByRandom() {
    return await this.poetryRepository
      .createQueryBuilder('poetry')
      .select()
      .orderBy('RANDOM()')
      .getOne();
  }

  /**
   * 更新ID查询一首诗词
   * @param id
   * @returns
   */
  async findOneById(id: number) {
    return await this.poetryRepository.findOne({
      where: {
        id,
      },
    });
  }
}
