import { Transaction } from '../../enterprise/entities/transaction'

export abstract class TransactionRepository {
   abstract findById(id: string): Promise<Transaction | null>
   abstract save(transaction: Transaction): Promise<void>
   abstract create(transaction: Transaction): Promise<void>
}