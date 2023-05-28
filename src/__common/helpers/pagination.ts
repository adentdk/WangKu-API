export class PaginationHelper {
  static getLimitOffset(
    page: number,
    pageSize: number,
  ): { limit: number; offset: number } {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    return { limit, offset };
  }

  static getTotalPages(totalData: number, pageSize: number) {
    return Math.ceil(totalData / pageSize);
  }
}
