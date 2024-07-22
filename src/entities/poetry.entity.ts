import { Column, Entity, PrimaryColumn } from 'typeorm';
import { pipe } from 'ramda';
import { EntityClass, EntityWithTime } from 'src/shared/typeorm/entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('poetry')
export class Poetry extends pipe(EntityWithTime)(EntityClass) {
  @ApiProperty({
    description: 'ID',
  })
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    description: '作者',
  })
  @Column()
  author: string;

  @ApiProperty({
    description: '类型',
  })
  @Column()
  type: string;

  @ApiProperty({
    description: '题目',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: '内容',
  })
  @Column()
  contents: string;

  @ApiProperty({
    description: '内容',
  })
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];
}
