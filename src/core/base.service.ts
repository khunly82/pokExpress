import { ObjectLiteral } from "typeorm";
import { BaseRepository } from "./base.repository";

export abstract class BaseService<T extends ObjectLiteral> {
    constructor(
        protected repository: BaseRepository<T>
    ) { }
}