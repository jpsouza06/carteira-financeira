import { InMemoryWalletRepository } from 'test/repositories/in-memory-wallet-repository'
import { CreateTransactionReversalUseCase } from './create-transaction-reversal'
import { makeWallet } from 'test/factories/make-wallet'
import Decimal from 'decimal.js'
import { InMemoryTransactionRepository } from 'test/repositories/in-memory-transaction-reposoitory'
import { InMemoryTransactionReversalRepository } from 'test/repositories/in-memory-transaction-reversal-reposoitory'
import { makeTransaction } from 'test/factories/make-transaction'

let inMemoryTransactionReversalRepository: InMemoryTransactionReversalRepository
let inMemoryTransactionRepository: InMemoryTransactionRepository
let inMemoryWalletRepository: InMemoryWalletRepository
let sut: CreateTransactionReversalUseCase

describe('Create TransactionReversal', () => {
	beforeEach(() => {
		inMemoryTransactionReversalRepository = new InMemoryTransactionReversalRepository()
		inMemoryTransactionRepository = new InMemoryTransactionRepository()
		inMemoryWalletRepository = new InMemoryWalletRepository()
		sut = new CreateTransactionReversalUseCase(
			inMemoryTransactionReversalRepository, 
			inMemoryTransactionRepository,
			inMemoryWalletRepository
		)
	})

	test('should be able to create a transaction reversal', async () => {    
		const senderWallet = makeWallet({balance: new Decimal(150.27)})
		const receiverWallet = makeWallet({balance: new Decimal(50.80)})

		await inMemoryWalletRepository.create(senderWallet)
		await inMemoryWalletRepository.create(receiverWallet)

		const transaction = makeTransaction({
			amount: new Decimal(50.00),
			senderId: senderWallet.userId,
			receiverId: receiverWallet.userId,
		})

		await inMemoryTransactionRepository.create(transaction)

		const result = await sut.execute({
			transactionId: transaction.id.toString(),
			reason: 'Refound'
		})

		expect(result.isRight()).toBe(true)
		expect(inMemoryTransactionReversalRepository.items[0].transactionId).toEqual(transaction.id)
		expect(inMemoryTransactionRepository.items[0].status).toEqual('reversed')

		expect(inMemoryWalletRepository.items[0].balance).toEqual(new Decimal(200.27))
		expect(inMemoryWalletRepository.items[1].balance).toEqual(new Decimal(0.80))
	})
})