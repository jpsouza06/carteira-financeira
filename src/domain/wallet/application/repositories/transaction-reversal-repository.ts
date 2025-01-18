import { TransactionReversal } from '../../enterprise/entities/transaction-reversal'

export interface TransactionReversalRepository {
   findByTransactionId(transactionId: string): Promise<TransactionReversal | undefined>
   create(transactionreversal: TransactionReversal): Promise<void>
}