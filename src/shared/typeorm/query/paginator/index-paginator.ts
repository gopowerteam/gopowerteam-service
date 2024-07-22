import { ObjectType, SelectQueryBuilder } from 'typeorm';
import { PaginatorMode, SortMode } from '../../enums';
import { snake } from 'radash';

export interface IndexPagingQuery {
  skip: number;
  limit: number;
  sort?: Record<string, SortMode>;
}

export interface IndexPaginationOptions<Entity> {
  mode: PaginatorMode.Index;
  entity: ObjectType<Entity>;
  query?: IndexPagingQuery;
}

export interface IndexPagingResult<Entity> {
  data: Entity[];
  total: number;
}

/**
 * 页码分页器
 */
export class IndexPaginator<Entity> {
  private limit = 20;
  private skip = 0;
  private sort: Record<string, SortMode>;

  public constructor(private entity: ObjectType<Entity>) {}

  public setLimit(limit: number) {
    this.limit = limit;
  }

  public setSkip(skip: number) {
    this.skip = skip;
  }

  public setSort(sort: Record<string, SortMode>) {
    this.sort = sort;
  }

  public async paginate(
    builder: SelectQueryBuilder<Entity>,
  ): Promise<IndexPagingResult<Entity>> {
    const [entities, count] =
      await this.appendPagingQuery(builder).getManyAndCount();

    return this.toPagingResult(entities, count);
  }

  private appendPagingQuery(
    builder: SelectQueryBuilder<Entity>,
  ): SelectQueryBuilder<Entity> {
    const queryBuilder = new SelectQueryBuilder<Entity>(builder);

    queryBuilder.take(this.limit);

    queryBuilder.skip(this.skip);

    return this.appendSortQuery(queryBuilder);
  }

  /**
   * 添加order语句
   * @param builder
   * @returns
   */
  private appendSortQuery(
    builder: SelectQueryBuilder<Entity>,
  ): SelectQueryBuilder<Entity> {
    if (this.sort) {
      Object.entries(this.sort).forEach(([key, sort]) => {
        builder.addOrderBy(`${snake(key)}`, sort);
      });
    }

    return builder;
  }

  private toPagingResult<Entity>(
    entities: Entity[],
    total: number,
  ): IndexPagingResult<Entity> {
    return {
      data: entities,
      total,
    };
  }
}
