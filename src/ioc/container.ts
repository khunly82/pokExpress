import { Container } from "inversify";
import { OrderController } from "../controllers/order.controller.js";
import { QueryRunner } from "typeorm";
import { OrderEntity } from "@/entities/order.entity.js";
import { OrderLineEntity } from "@/entities/order-line.entity.js";
import { OrderService } from "@/services/order.service.js";
import { OrderLineService } from "@/services/order-line.service.js";
import { OrderRepository } from "@/repositories/order.repository.js";
import { OrderLineRepository } from "@/repositories/order-line.repository.js";
import { TYPES } from "./types.js";
import { AppDataSource } from "@/configs/database.js";
import { TransactionMiddleware } from "@/middlewares/transaction.middleware.js";
import { transactionStorage } from "./transaction-store.js";

export const container = new Container();

container.bind(OrderController).toSelf().inRequestScope();

container.bind(TransactionMiddleware).toSelf().inRequestScope();

// queryRunner
container.bind<QueryRunner>(TYPES.QueryRunner)
    .toDynamicValue((context) => {
        const qr = transactionStorage.getStore();
        return qr ?? AppDataSource.createQueryRunner();
    })
    .inRequestScope();

// repositories
container.bind(TYPES.OrderRepository)
    .toDynamicValue(context => context.get<QueryRunner>(TYPES.QueryRunner).manager.getRepository(OrderEntity))
    .inRequestScope();
container.bind(TYPES.OrderLineRepository)
    .toDynamicValue(context => context.get<QueryRunner>(TYPES.QueryRunner).manager.getRepository(OrderLineEntity))
    .inRequestScope();

// baseRepositories
container.bind(OrderRepository).toSelf()
    .inRequestScope();
container.bind(OrderLineRepository).toSelf()
    .inRequestScope();

// services
container.bind(OrderService).toSelf().inRequestScope();
container.bind(OrderLineService).toSelf().inRequestScope();