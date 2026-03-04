import { injectable } from "inversify";
import { AppDataSource } from "@/configs/database";
import { transactionStorage } from "@/ioc/transaction-store";

@injectable()
export class TransactionMiddleware {
    public async execute(req: any, res: any, next: any) {
        const qr = AppDataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();

        // On enveloppe TOUTE la suite de la requête dans le store
        transactionStorage.run(qr, () => {
            res.on("finish", async () => {
                try {
                    if (res.statusCode < 400) {
                        if (qr.isTransactionActive) await qr.commitTransaction();
                    } else {
                        if (qr.isTransactionActive) await qr.rollbackTransaction();
                    }
                } finally {
                    if (!qr.isReleased) await qr.release();
                }
            });
            next();
        });
    }
}