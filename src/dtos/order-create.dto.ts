export class OrderCreateDto {
    orderLines: OrderLineCreateDto[]
}

export class OrderLineCreateDto {
    productName: string;
}