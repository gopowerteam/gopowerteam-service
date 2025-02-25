import { snake } from 'radash';
import { SortMode, PaginatorMode } from '../../enums';

import {
  Brackets,
  ObjectType,
  SelectQueryBuilder,
  WhereExpressionBuilder,
} from 'typeorm';

export interface CursorPagingQuery {
  cursor?: string;
  limit?: number;
  sort?: Record<string, SortMode>;
}

export interface CursorPaginationOptions<Entity> {
  entity: ObjectType<Entity>;
  mode: PaginatorMode.Cursor;
  query?: CursorPagingQuery;
  cursorKey?: string;
  sortKey?: string;
}

export interface CursorPagingResult<Entity> {
  data: Entity[];
  cursor?: string;
  finished: boolean;
}

export class CursorPaginator<Entity> {
  private cursor?: string;

  private alias: string = snake(this.entity.name);

  private limit = 10;

  private sort: Record<string, SortMode>;

  public constructor(
    private entity: ObjectType<Entity>,
    private cursorKey: string = 'id',
    private sortKey: string = 'created_at',
  ) {}

  public setLimit(limit: number): void {
    this.limit = limit;
  }

  public setSort(sort: Record<string, SortMode>): void {
    this.sort = sort;
  }

  public setCursor(cursor: string): void {
    this.cursor = cursor;
  }

  public setAlias(alias: string): void {
    this.alias = alias;
  }

  public async paginate(
    builder: SelectQueryBuilder<Entity>,
  ): Promise<CursorPagingResult<Entity>> {
    const entities = await this.appendPagingQuery(builder).getMany();
    const finished = entities.length < this.limit;

    if (!finished) {
      entities.splice(entities.length - 1, 1);
    }

    return this.toPagingResult(entities, finished);
  }

  /**
   * 添加分页查询
   * @param builder
   * @returns
   */
  private appendPagingQuery(
    builder: SelectQueryBuilder<Entity>,
  ): SelectQueryBuilder<Entity> {
    // builder对象
    const queryBuilder = new SelectQueryBuilder<Entity>(builder);

    // 通过游标查询数据
    if (this.cursor) {
      queryBuilder.andWhere(
        new Brackets((where) =>
          this.buildCursorQuery(this.cursor, where, queryBuilder),
        ),
      );
    }

    // 使用limit + 1来确认数据是否结束
    queryBuilder.take(this.limit + 1);

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
    const sort = this.sort || {
      [this.sortKey]: SortMode.DESC,
    };

    Object.entries(sort).forEach(([key, sort]) => {
      builder.addOrderBy(`${this.alias}.${key}`, sort);
    });

    return builder;
  }

  /**
   * 构建游标查询
   * @param cursor
   * @param where
   * @param builder
   * @returns
   */
  private buildCursorQuery(
    cursor: string,
    where: WhereExpressionBuilder,
    builder: SelectQueryBuilder<Entity>,
  ): void {
    if (!this.cursor) {
      return;
    }

    // 查询游标位置
    const cursorQuery = builder
      .subQuery()
      .from(this.entity, this.alias)
      .select(`${this.alias}.${this.sortKey}`)
      .where(`${this.alias}.${this.cursorKey} = :cursorKey`, {
        cursorKey: cursor,
      })
      .getQuery();

    // 设置游标参数
    builder.setParameters({
      cursorKey: cursor,
    });

    where.andWhere(
      `${this.alias}.${this.sortKey} ${this.getOperator()} (${cursorQuery})`,
    );
  }

  /**
   * 获取操作符
   * @returns
   */
  private getOperator(): string {
    switch ((this.sort || {})?.[this.sortKey]) {
      case SortMode.ASC:
        return '>';
      case SortMode.DESC:
        return '<';
      // 默认处理
      default:
        return '>';
    }
  }

  /**
   * 获取分页结果
   * @param entities
   * @returns
   */
  private toPagingResult<Entity>(
    entities: Entity[],
    finished: boolean,
  ): CursorPagingResult<Entity> {
    const [last] = [...(entities || [])].reverse();

    return {
      data: entities,
      cursor: last?.[this.cursorKey as string],
      finished,
    };
  }
}
