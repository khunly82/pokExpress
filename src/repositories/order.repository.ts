import { BaseRepository } from "@/core/base.repository";
import { OrderEntity } from "@/entities/order.entity";
import { TYPES } from "@/ioc/types";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";

@injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
    constructor(
        @inject(TYPES.OrderRepository)
        repository: Repository<OrderEntity>
    ) {
        super(repository)
    }
    findAllWithOrderLines() {
        return this.repository.find({ relations: ['orderLines'] });
    }
}