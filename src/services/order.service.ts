import { BaseService } from "@/core/base.service";
import { OrderCreateDto } from "@/dtos/order-create.dto";
import { OrderDto } from "@/dtos/order.dto";
import { OrderEntity } from "@/entities/order.entity";
import { inject, injectable } from "inversify";
import { OrderLineService } from "./order-line.service";
import { OrderRepository } from "@/repositories/order.repository";

@injectable()
export class OrderService extends BaseService<OrderEntity> {

    constructor(
        @inject(OrderRepository)
        repository: OrderRepository,
        @inject(OrderLineService)
        private orderLineService: OrderLineService
    ) {
        super(repository)
    }

    async findAll() {
        return (await (this.repository as OrderRepository).findAllWithOrderLines())
            .map(o => new OrderDto(o));
    }

    async create(order: OrderCreateDto) {
        const created = await this.repository.create({
            date: new Date()
        });
        // save all orderLines simultanously
        await Promise.all(order.orderLines.map(l => this.orderLineService.create(created.id, l)));
        return created;
    } 
}