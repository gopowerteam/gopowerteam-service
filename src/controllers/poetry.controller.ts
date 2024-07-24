import { Controller, Get, Param, Res, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Poetry } from 'src/entities/poetry.entity';
import { Repository } from 'typeorm';
import * as queryString from 'querystring'
import * as dayjs from 'dayjs';
import * as dayOfYear from 'dayjs/plugin/dayOfYear';
import { PoetryService } from 'src/services/poetry.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { IdInput } from 'src/shared/typeorm/dto/id.input'
import { HttpService } from '@nestjs/axios';
import { createWriteStream } from 'node:fs';
import type { Response } from 'express'; 

dayjs.extend(dayOfYear);

@Controller('poetry')
@ApiTags('poetry')
export class PoetryController {
  constructor(
    @InjectRepository(Poetry)
    private poetryRepository: Repository<Poetry>,
    private poetryService: PoetryService,
    private readonly httpService: HttpService
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

  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  @ApiOperation({ operationId: 'findOne', summary: '根据ID查询' })
  @ApiOkResponse({ type: Poetry })
  async findOne(@Param() { id }: IdInput.Number) {
    return this.poetryService.findOneById(id);
  }

  // @UseInterceptors(CacheInterceptor)
  @Get('speak/:id')
  @ApiOperation({ operationId: 'speak', summary: '根据ID生成语音' })
  @ApiOkResponse()
  async speak(@Param() { id }: IdInput.Number, @Res() res: Response) {
    
    res.set({
      'Content-Type': 'audio/mp3',
    });

    const poetry = await this.poetryService.findOneById(id);

    const host = "https://dds.dui.ai/runtime/v1/synthesize"
    const params = queryString.stringify({
      text: poetry.content,
      voiceId: "kaolam_diantai",
      audioType: "mp3",
      volume: 50,
      speed: 1,
    })
    const url = `${host}?${params}`
    this.httpService.get(url,{responseType: 'arraybuffer'}).subscribe({
      next: (response) => {
       res.send(response.data)
      },
      complete() {
        res.end()
      },
    })
  }
}
