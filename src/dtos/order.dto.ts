import { OrderEntity } from "@/entities/order.entity";
import { OrderLineDto } from "./order-line.dto";

export class OrderDto {
    id: number;
    date: Date;
    orderLines: OrderLineDto[];

    constructor(order: OrderEntity) {
        this.id = order.id;
        this.date = order.date;
        if(order.orderLines) {
            this.orderLines = order.orderLines.map(l => new OrderLineDto(l))
        }
    }
}