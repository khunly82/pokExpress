import { BaseRepository } from "@/core/base.repository";
import { OrderLineEntity } from "@/entities/order-line.entity";
import { TYPES } from "@/ioc/types";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";

@injectable()
export class OrderLineRepository extends BaseRepository<OrderLineEntity> {
    constructor(
        @inject(TYPES.OrderLineRepository)
        repository: Repository<OrderLineEntity>
    ) {
        super(repository)
    }
}