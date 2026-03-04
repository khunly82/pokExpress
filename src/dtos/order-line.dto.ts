import { OrderLineEntity } from "@/entities/order-line.entity";

export class OrderLineDto {
    id: number;
    productName: string;
    orderId: number;

    constructor(orderLine: OrderLineEntity) {
        this.id = orderLine.id;
        this.productName = orderLine.productName;
        this.orderId = orderLine.orderId;
    }
}