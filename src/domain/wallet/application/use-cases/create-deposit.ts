import { Either, left, right } from '@/core/either'
import { DepositRepository } from '../repositories/deposit-repository'
import { Deposit } from '../../enterprise/entities/deposit'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import Decimal from 'decimal.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { WalletRepository } from '../repositories/wallet-repository'
import { Injectable } from '@nestjs/common'

interface CreateDepositUseCaseRequest {
    origin: string
    userId: string
    amount:  string
}

type CreateDepositUseCaseResponse = Either<
   ResourceNotFoundError,
   {
      deposit: Deposit
   }
>

@Injectable()
export class CreateDepositUseCase {
	constructor(
    private depositsRepository: DepositRepository,
    private walletRepository: WalletRepository
	) {}
	async execute  (
		{
			origin,
			userId,
			amount,
		}: CreateDepositUseCaseRequest
	): Promise<CreateDepositUseCaseResponse> {
		const wallet = await this.walletRepository.findByUserId(userId)

		if(!wallet) {
			return left(new ResourceNotFoundError('Wallet'))
		}

		wallet.balance = wallet.balance.add(new Decimal(amount))

		const deposit = Deposit.create({
			origin,
			receiverId: new UniqueEntityId(userId),
			walletId: wallet.id,
			amount: new Decimal(amount),
		})

		await this.depositsRepository.create(deposit)

		return right({
			deposit,
		})
	}
}