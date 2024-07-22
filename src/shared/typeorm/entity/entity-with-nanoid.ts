import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, PrimaryColumn } from 'typeorm';
import { Constructor } from '.';
import { nanoid } from 'nanoid';
/**
 * 基础实体类型
 * 默认添加id字段
 * @param Base
 * @returns
 */
export function EntityWithNanoID<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @ApiProperty({ description: 'ID', type: 'string' })
    @PrimaryColumn({ type: 'char', length: 24 })
    id: string;

    @BeforeInsert()
    setId() {
      this.id = nanoid(24).toLocaleUpperCase();
    }
  }

  return AbstractBase;
}
