class SqlQuery {
  public table: string = "";
  public columns: string[] = ["*"];
  public conditions: string[] = [];
  public orderByClause: string = "";
  public limitCount: number | null = null;

  public toString(): string {
    let query = `SELECT ${this.columns.join(", ")} FROM ${this.table}`;

    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(" AND ")}`;
    }
    if (this.orderByClause) {
      query += ` ORDER BY ${this.orderByClause}`;
    }
    if (this.limitCount) {
      query += ` LIMIT ${this.limitCount}`;
    }

    return query + ";";
  }
}

class QueryBuilder {
  private query: SqlQuery;

  constructor(table: string) {
    this.query = new SqlQuery();
    this.query.table = table;
  }

  public select(...columns: string[]): this {
    this.query.columns = columns;
    return this;
  }

  public where(condition: string): this {
    this.query.conditions.push(condition);
    return this;
  }

  public orderBy(column: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.query.orderByClause = `${column} ${direction}`;
    return this;
  }

  public limit(count: number): this {
    this.query.limitCount = count;
    return this;
  }

  public build(): SqlQuery {
    if (!this.query.table) {
      throw new Error("Cannot build a query without a table name.");
    }
    return this.query;
  }
}

const complexQuery = new QueryBuilder("users")
  .select("id", "name", "email")
  .where("age >= 18")
  .where("is_active = true")
  .orderBy("created_at", "DESC")
  .limit(50)
  .build();

console.log(complexQuery.toString());

const simpleQuery = new QueryBuilder("products")
  .select("product_name", "price")
  .limit(10)
  .build();

console.log(simpleQuery.toString());
