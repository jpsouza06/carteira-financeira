import { Transaction } from '../../enterprise/entities/transaction'

export interface TransactionRepository {
   findManyByUserId(userId: string): Promise<Transaction[] | null>
   findById(id: string): Promise<Transaction | undefined>
   save(transaction: Transaction): Promise<void>
   create(transaction: Transaction): Promise<void>
}