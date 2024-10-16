import { db } from "../lib/db.config";

class Transaction {
    static async startTransaction(operation: any) {
        return await db.$transaction(operation);
    }

    static async commitTransaction(transaction: any) {
        await transaction.commit();
    }

    static async rollbackTransaction(transaction: any) {
        await transaction.rollback();
    }
}
export default Transaction