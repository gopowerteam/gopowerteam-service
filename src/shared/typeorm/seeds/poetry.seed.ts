import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Poetry } from 'src/entities/poetry.entity';
import * as poetryJSON from 'src/resource/poetry.json';

export default class PoetrySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // 清空数据
    await dataSource.query('TRUNCATE "poetry" RESTART IDENTITY;');

    const poetryRepository = dataSource.getRepository(Poetry);

    if (poetryJSON) {
      const data = poetryJSON;

      await poetryRepository.save(
        data.map((item) => ({
          id: item.id,
          author: item.author,
          dynasty: '唐',
          title: item.title,
          content: item.contents,
          tags: ['唐诗三百首'],
        })),
      );
    }
  }
}
