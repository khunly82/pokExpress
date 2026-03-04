import { BaseService } from "@/core/base.service";
import { OrderLineCreateDto } from "@/dtos/order-create.dto";
import { OrderLineEntity } from "@/entities/order-line.entity";
import { OrderLineRepository } from "@/repositories/order-line.repository";
import { inject, injectable } from "inversify";

@injectable()
export class OrderLineService extends BaseService<OrderLineEntity> {
    constructor(
        @inject(OrderLineRepository)
        repository: OrderLineRepository
    ) {
        super(repository)
    }

    async create(orderId: number, line: OrderLineCreateDto) {
        // eventualy add specific logic each time a line is created
        await this.repository.create({ ...line, orderId });
    }
}