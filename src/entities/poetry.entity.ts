import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { pipe } from 'ramda';
import { EntityClass, EntityWithTime } from 'src/shared/typeorm/entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('poetry')
export class Poetry extends pipe(EntityWithTime)(EntityClass) {
  @ApiProperty({
    description: 'ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '作者',
  })
  @Column()
  author: string;

  @ApiProperty({
    description: '朝代',
  })
  @Column()
  dynasty: string;

  @ApiProperty({
    description: '标题',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: '内容',
  })
  @Column()
  content: string;

  @ApiProperty({
    description: '标签',
  })
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];
}
