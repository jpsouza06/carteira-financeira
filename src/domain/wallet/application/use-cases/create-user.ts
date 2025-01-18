import { Either, right } from '@/core/either'
import { hash } from 'bcryptjs'
import { UserRepository } from '../repositories/user-repository'
import { User } from '../../enterprise/entities/user'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
   null,
   {
      user: User
   }
>

export class CreateUserUseCase {
	constructor(
    private usersRepository: UserRepository
	) {}
	async execute  (
		{
			name,
			email,
			password
		}: CreateUserUseCaseRequest
	): Promise<CreateUserUseCaseResponse> {
		const hashedPassword = await hash(password, 8)
		const user = User.create({
			name,
			email,
			password : hashedPassword  
		})

		await this.usersRepository.create(user)

		return right({
			user,
		})
	}
}