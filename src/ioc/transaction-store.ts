import { AsyncLocalStorage } from 'node:async_hooks';
import { QueryRunner } from 'typeorm';

export const transactionStorage = new AsyncLocalStorage<QueryRunner>();