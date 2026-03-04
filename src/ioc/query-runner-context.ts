import { injectable } from "inversify";
import { QueryRunner } from "typeorm";

@injectable()
export class QueryRunnerContext {
    private queryRunner: QueryRunner | null = null;

    setQueryRunner(qr: QueryRunner) {
        this.queryRunner = qr;
    }

    getQueryRunner(): QueryRunner | null {
        return this.queryRunner;
    }

    clear() {
        this.queryRunner = null;
    }
}
