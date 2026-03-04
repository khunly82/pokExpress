import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity()
export class OrderLineEntity {
    
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'productName', nullable: false, type: 'varchar' })
    productName: string;

    @Column({ name: 'orderId', nullable: false, type: 'int' })
    orderId: number;

    @ManyToOne(() => OrderEntity, o => o.orderLines)
    order: OrderEntity;
}