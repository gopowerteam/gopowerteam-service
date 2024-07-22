import { Brackets, FindOptionsWhere } from 'typeorm';
import { QueryInput } from './query/inputs/query.input';
import { CursorParams } from './query/params/cursor-params';
import { PageParams } from './query/params/page-params';
import { SortMode } from './enums';

export interface QueryInputParam<T = any> {
  sort?: Record<string, SortMode>;
  page?: PageParams;
  cursor?: CursorParams;
  buildWhereQuery: () => Brackets;
  buildWhereParams: () => FindOptionsWhere<T>;
}

export type Constructor<T = QueryInput> = new (...args: any[]) => T;
