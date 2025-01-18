import { Either, left, right } from '@/core/either'
import { WalletRepository } from '../repositories/wallet-repository'
import { Wallet } from '../../enterprise/entities/wallet'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import Decimal from 'decimal.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UserRepository } from '../repositories/user-repository'
import { ResourceAlreadyExists } from '@/core/erros/errors/resource-already-exists'

interface CreateWalletUseCaseRequest {
  userId: string
}

type CreateWalletUseCaseResponse = Either<
   ResourceNotFoundError,
   {
      wallet: Wallet
   }
>

export class CreateWalletUseCase {
	constructor(
    private walletsRepository: WalletRepository,
    private userRepository: UserRepository
	) {}
	async execute  (
		{
			userId
		}: CreateWalletUseCaseRequest
	): Promise<CreateWalletUseCaseResponse> {

		const user = await this.userRepository.findById(userId)

		if(!user) {
			return left(new ResourceNotFoundError())
		}

		const walletAlreadyExists = await this.walletsRepository.findByUserId(userId)

		if(walletAlreadyExists) {
			return left(new ResourceAlreadyExists())
		}

		const wallet = Wallet.create({
			userId: new UniqueEntityId(userId),
			balance: new Decimal(0.00)
		})

		await this.walletsRepository.create(wallet)

		return right({
			wallet,
		})
	}
}