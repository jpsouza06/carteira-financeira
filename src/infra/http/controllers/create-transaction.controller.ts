import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post, UnprocessableEntityException } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CreateTransactionUseCase } from '@/domain/wallet/application/use-cases/create-transaction'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { NotEnoughBalanceError } from '@/domain/wallet/application/use-cases/errors/not-enough-balance'
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Transaction } from '@/domain/wallet/enterprise/entities/transaction'
import { schemaCreateResponseNotFound, schemaCreateResponseUnprocessableEntity, schemaCreateResponseBadRequest } from '../docs/swagger-transaction'

const createTransactionBodySchema = z.object({
	receiverId: z.string().uuid(),
	amount: z.string()
})

type CreateTransactionBodySchema = z.infer<typeof createTransactionBodySchema>

@Controller('/transaction/transfer')
export class CreateTransactionController {
	constructor(private createTransaction: CreateTransactionUseCase) {}

  @Post()
  @HttpCode(201)
	@ApiOperation({ summary: 'Create Transaction' })
	@ApiBearerAuth()
	@ApiBody({type: Transaction})
	@ApiCreatedResponse({description: 'Created'})
	@ApiResponse(schemaCreateResponseNotFound)
	@ApiResponse(schemaCreateResponseUnprocessableEntity)
	@ApiResponse(schemaCreateResponseBadRequest)
	async handle(
    @Body(new ZodValidationPipe(createTransactionBodySchema)) body: CreateTransactionBodySchema,
    @CurrentUser() user: UserPayload
	) {
		const { receiverId, amount } = body
		const userId = user.sub

		const result = await this.createTransaction.execute({
			amount,
			receiverId,
			senderId: userId,
			status: 'completed'
		})

		if(result.isLeft()) {
			const error = result.value
				
			switch(error.constructor) {
			case ResourceNotFoundError:
				throw new NotFoundException(error.message)
			case NotEnoughBalanceError:
				throw new UnprocessableEntityException(error.message)
			default:
				throw new BadRequestException(error.message)
			}
		}

	}
}