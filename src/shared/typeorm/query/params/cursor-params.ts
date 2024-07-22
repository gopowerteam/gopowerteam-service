export class CursorParams {
  public cursor: string
  public size: number
  public cursorKey: string
  public sortKey: string

  #defaultSize = 10

  constructor(
    cursor: string,
    size: number,
    cursorKey: string,
    sortKey: string,
  ) {
    this.cursor = cursor
    this.size = size || this.#defaultSize
    this.cursorKey = cursorKey || 'id'
    this.sortKey = sortKey || 'createdAt'
  }

  public get limit() {
    return this.size
  }
}
