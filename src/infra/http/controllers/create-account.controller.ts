import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateUserUseCase } from '@/domain/wallet/application/use-cases/create-user'
import { ResourceAlreadyExists } from '@/core/erros/errors/resource-already-exists'
import { Public } from '@/infra/auth/public'
import { AccountPresenter } from '../presenters/account-presenter'

const createAccountBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/account')
@Public()
export class CreateAccountController {
	constructor(
		private createUser: CreateUserUseCase
	) {}

  @Post()
  @HttpCode(201)
	@UsePipes(
		new ZodValidationPipe(createAccountBodySchema)
	)
	async handle(
		@Body() body: CreateAccountBodySchema
	) {
		const { name, email, password } = body

		const result = await this.createUser.execute({
			email,
			name,
			password
		})

		if(result.isLeft()) {
			const error = result.value
		
			switch(error.constructor) {
			case ResourceAlreadyExists:
				throw new ConflictException(error.message)
			default:
				throw new BadRequestException(error.message)
			}
		}
		
		return {
			user: AccountPresenter.toHttp(result.value.user)
		}
	}
}