import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Poetry } from 'src/entities/poetry.entity';
import * as poetryJSON from 'src/resource/poetry.json';
import { plainToInstance } from 'class-transformer';

export default class PoetrySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // 清空数据
    await dataSource.query('TRUNCATE "poetry" RESTART IDENTITY;');

    const poetryRepository = dataSource.getRepository(Poetry);

    if (poetryJSON) {
      const data = plainToInstance(Poetry, poetryJSON, {
        enableImplicitConversion: true,
      });

      await poetryRepository.save(
        data.map((item) =>
          Object.assign(item, {
            tags: ['唐诗', '唐诗三百首'],
          }),
        ),
      );
    }
  }
}
