import { TYPES } from "@/ioc/types";
import { QueryRunnerContext } from "@/ioc/query-runner-context";
import { injectable, inject } from "inversify";
import { QueryRunner } from "typeorm";

@injectable()
export class TransactionMiddleware {
    constructor(
        @inject(TYPES.QueryRunner) private readonly _qr: QueryRunner,
        @inject(QueryRunnerContext) private readonly _qrContext: QueryRunnerContext
    ) {}

    public async execute(req: any, res: any, next: any) {
        await this._qr.connect();
        await this._qr.startTransaction();
        this._qrContext.setQueryRunner(this._qr);
        req.queryRunner = this._qr;

        res.on("finish", async () => {
            try {
                if (res.statusCode < 400) {
                    await this._qr.commitTransaction();
                } else {
                    if (this._qr.isTransactionActive) await this._qr.rollbackTransaction();
                }
            } finally {
                this._qrContext.clear();
                if (!this._qr.isReleased) await this._qr.release();
            }
        });
        next();
    }
}