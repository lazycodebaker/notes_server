
import { SqlEntityManager, SqliteDriver, EntityManager } from "@mikro-orm/sqlite";
import { Request, Response } from "express";

export type TContext = {
    request: Request,
    response: Response,
    next: () => void,
    em: SqlEntityManager<SqliteDriver> & EntityManager<any>
}