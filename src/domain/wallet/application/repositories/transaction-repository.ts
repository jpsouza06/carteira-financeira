import { Transaction } from '../../enterprise/entities/transaction'

export interface TransactionRepository {
   findManyByUserId(userId: string): Promise<Transaction[] | null>
   create(transaction: Transaction): Promise<void>
}