import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { schemaCreateResponseNotFound, schemaCreateResponseBadRequest } from '../docs/swagger-transaction-reversal'
import { CreateTransactionReversalUseCase } from '@/domain/wallet/application/use-cases/create-transaction-reversal'
import { TransactionReversal } from '@/domain/wallet/enterprise/entities/transaction-reversal'

const createTransactionReversalBodySchema = z.object({
	transactionId: z.string().uuid(),
	reason: z.string()
})

type CreateTransactionReversalBodySchema = z.infer<typeof createTransactionReversalBodySchema>

@Controller('/transaction/reversal')
export class CreateTransactionReversalController {
	constructor(private createTransactionReversal: CreateTransactionReversalUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Transaction Reversal' })
  @ApiBearerAuth()
  @ApiBody({type: TransactionReversal})
  @ApiCreatedResponse({description: 'Created'})
  @ApiResponse(schemaCreateResponseNotFound)
  @ApiResponse(schemaCreateResponseBadRequest)
	async handle(
    @Body(new ZodValidationPipe(createTransactionReversalBodySchema)) body: CreateTransactionReversalBodySchema,
	) {
		const { transactionId, reason } = body

		const result = await this.createTransactionReversal.execute({
			transactionId,
			reason,
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