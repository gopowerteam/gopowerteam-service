import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Constructor } from '.';
import { Type } from 'class-transformer';

/**
 * 基础实体类型
 * 默认添加createAt字段 *
 * 默认添加updateAt字段 *
 * @param Base
 * @returns
 */
export function EntityWithTime<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @Type(() => Date)
    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamp without time zone',
    })
    @ApiProperty({ description: '创建日期', type: 'string' })
    public createdAt: Date;

    @Type(() => Date)
    @UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamp without time zone',
    })
    @ApiProperty({ description: '更新日期', type: 'string' })
    public updatedAt: Date;
  }
  return AbstractBase;
}
