import { Either, left, right } from '@/core/either'
import { TransactionRepository } from '../repositories/transaction-repository'
import { WalletRepository } from '../repositories/wallet-repository'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { TransactionReversal } from '../../enterprise/entities/transaction-reversal'
import { TransactionReversalRepository } from '../repositories/transaction-reversal-repository'
import { Injectable } from '@nestjs/common'
import { OnlyCompletedTransactions } from './errors/only-completed-transactions'

interface CreateTransactionReversalUseCaseRequest {
  transactionId: string
	reason: string
}

type CreateTransactionReversalUseCaseResponse = Either<
ResourceNotFoundError | OnlyCompletedTransactions,
   {
      transactionReversal: TransactionReversal
   }
>

@Injectable()
export class CreateTransactionReversalUseCase {
	constructor(
		private transactionReversalRepository: TransactionReversalRepository,
    private transactionRepository: TransactionRepository,
    private walletRepository: WalletRepository
	) {}
	async execute  (
		{
			transactionId,
			reason
		}: CreateTransactionReversalUseCaseRequest
	): Promise<CreateTransactionReversalUseCaseResponse> {
		const transaction = await this.transactionRepository.findById(transactionId)

		if(!transaction) {
			return left(new ResourceNotFoundError('Transaction'))
		}

		if(transaction.status !== 'completed') {
			return left(new OnlyCompletedTransactions())
		}

		const senderWallet = await this.walletRepository.findByUserId(transaction.senderId.toString())
		const receiverWallet = await this.walletRepository.findByUserId(transaction.receiverId.toString())

		if(!senderWallet) {
			return left(new ResourceNotFoundError('Sender wallet'))
		}

		if(!receiverWallet) {
			return left(new ResourceNotFoundError('Receiver wallet'))
		}

		senderWallet.balance = senderWallet.balance.add(transaction.amount)
		receiverWallet.balance = receiverWallet.balance.sub(transaction.amount)

		const transactionReversal = TransactionReversal.create({
			transactionId: transaction.id,
			reason
		})

		await this.transactionReversalRepository.create(transactionReversal)
		await this.walletRepository.save(senderWallet)
		await this.walletRepository.save(receiverWallet)

		transaction.status = 'reversed'
		await this.transactionRepository.save(transaction)

		return right({
			transactionReversal,
		})
	}
}