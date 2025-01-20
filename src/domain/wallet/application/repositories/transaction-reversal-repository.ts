import { TransactionReversal } from '../../enterprise/entities/transaction-reversal'

export abstract class TransactionReversalRepository {
   abstract findByTransactionId(transactionId: string): Promise<TransactionReversal | null>
   abstract create(transactionreversal: TransactionReversal): Promise<void>
}