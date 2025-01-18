import { Either, left, right } from '@/core/either'
import { WalletRepository } from '../repositories/wallet-repository'
import { Wallet } from '../../enterprise/entities/wallet'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'

interface GetWalletByUserIdUseCaseRequest {
  userId: string
}

type GetWalletByUserIdUseCaseResponse = Either<
   ResourceNotFoundError,
   {
      wallet: Wallet
   }
>

export class GetWalletByUserIdUseCase {
	constructor(
    private walletsRepository: WalletRepository
	) {}
	async execute  (
		{
			userId
		}: GetWalletByUserIdUseCaseRequest
	): Promise<GetWalletByUserIdUseCaseResponse> {
		const wallet = await this.walletsRepository.findByUserId(userId)

		if(!wallet) {
			return left(new ResourceNotFoundError())
		}

		return right({
			wallet,
		})
	}
}