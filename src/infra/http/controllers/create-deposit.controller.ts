import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateDepositUseCase } from '@/domain/wallet/application/use-cases/create-deposit'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Deposit } from '@/domain/wallet/enterprise/entities/deposit'
import { schemaCreateResponseBadRequest, schemaCreateResponseNotFound } from '../docs/swagger-deposit'

const createDepositBodySchema = z.object({
	origin: z.string(),
	amount: z.string(),
})

type CreateDepositBodySchema = z.infer<typeof createDepositBodySchema>

@ApiTags('Deposit')
@Controller('/deposit')
export class CreateDepositController {
	constructor(
    private createDeposit: CreateDepositUseCase
	) {}

  @Post()
  @HttpCode(201)
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create Deposit' })
	@ApiBody({type: Deposit})
	@ApiCreatedResponse({description: 'Created'})
	@ApiResponse(schemaCreateResponseNotFound)
	@ApiResponse(schemaCreateResponseBadRequest)
	async handle(
    @Body(new ZodValidationPipe(createDepositBodySchema)) body: CreateDepositBodySchema,
    @CurrentUser() user: UserPayload
	) {
		const { origin, amount } = body
		const userId = user.sub

		const result = await this.createDeposit.execute({
			origin,
			userId,
			amount
		})

		if(result.isLeft()) {
			const error = result.value
    
			switch(error.constructor) {
			case ResourceNotFoundError:
				throw new NotFoundException(error.message)
			default:
				throw new BadRequestException(error.message)
			}
		}
	}
}