import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AuthenticateUserUseCase } from '@/domain/wallet/application/use-cases/authenticate-user'
import { WrongCredentials } from '@/domain/wallet/application/use-cases/errors/wrong-credentials'
import { Public } from '@/infra/auth/public'
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { schemaCreateResponseBadRequest, schemaCreateResponseUnauthorized } from '../docs/swagger-authenticate'

const authenticateBodySchema = z.object({
	email: z.string().email(),
	password: z.string()
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@ApiTags('sessions')
@Controller('/sessions')
@Public()
export class AuthenticateController {
	constructor(
    private authenticateUser: AuthenticateUserUseCase
	) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
	@ApiOperation({ summary: 'Create Authenticate' })
	@ApiBody({schema: {example: {name: 'teste', email: 'teste@teste.com'}}})
	@ApiCreatedResponse()
	@ApiResponse(schemaCreateResponseBadRequest)
	@ApiResponse(schemaCreateResponseUnauthorized)
	async handle(@Body() body: AuthenticateBodySchema) {
		const { email, password } = body

		const result = await this.authenticateUser.execute({
			email,
			password
		})

		if(result.isLeft()) {
			const error = result.value

			switch(error.constructor) {
			case WrongCredentials:
				throw new UnauthorizedException(error.message)
			default:
				throw new BadRequestException(error.message)
			}
		}

		const { accessToken } = result.value

		return {
			accessToken,
		}
	
	}
}