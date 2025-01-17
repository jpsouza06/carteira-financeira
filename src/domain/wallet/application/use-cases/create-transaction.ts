import { Either, left, right } from '@/core/either'
import { TransactionRepository } from '../repositories/transaction-repository'
import { Transaction } from '../../enterprise/entities/transaction'
import { WalletRepository } from '../repositories/wallet-repository'
import Decimal from 'decimal.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { NotEnoughBalanceError } from '@/core/erros/errors/not-enough-balance'

interface CreateTransactionUseCaseRequest {
  amount: string
  receiverId: string,
  senderId: string,
  status: 'pending' | 'completed' | 'reversed'
}

type CreateTransactionUseCaseResponse = Either<
  ResourceNotFoundError | NotEnoughBalanceError,
   {
      transaction: Transaction
   }
>

export class CreateTransactionUseCase {
	constructor(
    private transactionsRepository: TransactionRepository,
    private walletRepository: WalletRepository
	) {}
	async execute  (
		{
			amount,
			receiverId,
			senderId,
			status
		}: CreateTransactionUseCaseRequest
	): Promise<CreateTransactionUseCaseResponse> {
		const amountDecimal = new Decimal(amount)

		const senderWallet = await this.walletRepository.findByUserId(senderId)

		if(!senderWallet) {
			return left(new ResourceNotFoundError('Sender wallet not found'))
		}

		if(senderWallet.balance < amountDecimal) {
			return left(new NotEnoughBalanceError())
		}

		const receiverWallet = await this.walletRepository.findByUserId(receiverId)

		if(!receiverWallet) {
			return left(new ResourceNotFoundError('Receiver wallet not found'))
		}

		senderWallet.balance = senderWallet.balance.sub(amountDecimal)
		receiverWallet.balance = receiverWallet.balance.add(amountDecimal)

		const transaction = Transaction.create({
			amount: amountDecimal,
			receiverId: new UniqueEntityId(receiverId),
			senderId: new UniqueEntityId(senderId),
			status
		})

		await this.transactionsRepository.create(transaction)
		await this.walletRepository.save(senderWallet)
		await this.walletRepository.save(receiverWallet)

		return right({
			transaction,
		})
	}
}