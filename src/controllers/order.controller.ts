import { OrderService } from "@/services/order.service";
import { ApplyMiddleware, Body, Controller, Get, Post, Response } from "@inversifyjs/http-core";
import { inject } from "inversify";
import express from 'express';
import { OrderCreateDto } from "@/dtos/order-create.dto";
import { TransactionMiddleware } from "@/middlewares/transaction.middleware";

@Controller('/order')
export class OrderController {

    constructor(
        @inject(OrderService)
        private orderService: OrderService
    ) {}

    @Get()
    async get(@Response() response: express.Response) {
        response.status(200).json(await this.orderService.findAll());
        return;
    }

    @Post()
    @ApplyMiddleware(TransactionMiddleware)
    async post(@Body() body: OrderCreateDto, @Response() response: express.Response) {
        try {            
            await this.orderService.create(body);
            response.status(201).send();
            return;
        }
        catch {
            response.status(500).send();
            return;
        }
    }
}