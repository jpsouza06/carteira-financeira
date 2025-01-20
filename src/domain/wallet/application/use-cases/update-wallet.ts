import { Either, left, right } from '@/core/either'
import { WalletRepository } from '../repositories/wallet-repository'
import { Wallet } from '../../enterprise/entities/wallet'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import Decimal from 'decimal.js'

interface UpdateWalletUseCaseRequest {
  userId: string
  balance: string
}

type UpdateWalletUseCaseResponse = Either<
   ResourceNotFoundError,
   {
      wallet: Wallet
   }
>

@Injectable()
export class UpdateWalletUseCase {
	constructor(
    private walletsRepository: WalletRepository
	) {}
	async execute  (
		{
			userId,
			balance
		}: UpdateWalletUseCaseRequest
	): Promise<UpdateWalletUseCaseResponse> {
		const wallet = await this.walletsRepository.findByUserId(userId)

		if(!wallet) {
			return left(new ResourceNotFoundError('Wallet'))
		}

		wallet.balance = new Decimal(balance)
    
		await this.walletsRepository.save(wallet)

		return right({
			wallet,
		})
	}
}