import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Poetry } from 'src/entities/poetry.entity';
import { Repository } from 'typeorm';

import * as dayjs from 'dayjs';
import * as dayOfYear from 'dayjs/plugin/dayOfYear';
import { PoetryService } from 'src/services/poetry.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
dayjs.extend(dayOfYear);

@Controller('poetry')
@ApiTags('poetry')
export class PoetryController {
  constructor(
    @InjectRepository(Poetry)
    private poetryRepository: Repository<Poetry>,
    private poetryService: PoetryService,
  ) {}

  @Get('random')
  @ApiOperation({ operationId: 'random', summary: '随机获取一首诗词' })
  @ApiOkResponse({ type: Poetry })
  async random() {
    return this.poetryService.findOneByRandom();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('today')
  @ApiOperation({ operationId: 'today', summary: '获取今日诗词' })
  @ApiOkResponse({ type: Poetry })
  async today() {
    console.log('123');
    const count = await await this.poetryRepository.count();
    const index = dayjs().dayOfYear() % count;

    return this.poetryService.findOneById(index);
  }
}
