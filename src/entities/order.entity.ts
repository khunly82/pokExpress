import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderLineEntity } from "./order-line.entity";

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ name: 'date', nullable: false, type: 'date' })
    date: Date

    @OneToMany(() => OrderLineEntity, l => l.order)
    orderLines: OrderLineEntity[]
}