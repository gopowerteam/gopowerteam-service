import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Constructor } from '../../interfaces';
import { SortMode } from '../../enums';

export function SortInput<T extends Constructor>(Base: T) {
  abstract class AbstractBase extends Base {
    @ApiProperty({
      required: false,
      type: 'string',
      description: '排序: createdAt,desc;',
    })
    @IsOptional()
    @Transform(({ value }: { value: string }) => {
      return value.split(';').reduce((r, v) => {
        const [key, sort] = v.split(',');
        if (key && sort && Object.keys(SortMode).includes(sort.toUpperCase())) {
          r[key] = sort.toUpperCase();
        }
        return r;
      }, {});
    })
    public sort: Record<string, SortMode>;
  }

  return AbstractBase;
}
