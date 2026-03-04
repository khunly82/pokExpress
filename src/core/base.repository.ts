import { DeepPartial, ObjectLiteral, Repository } from "typeorm";

export abstract class BaseRepository<T extends ObjectLiteral> {
    constructor(protected repository: Repository<T>) {}

    findAll() {
        return this.repository.find();
    }

    create(entity: DeepPartial<T>) {
        return this.repository.save(entity);
    }
}