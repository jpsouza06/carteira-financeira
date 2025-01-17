import { Body, Controller, HttpCode, NotFoundException, Post, UseGuards } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const createTransactionBodySchema = z.object({
	receiverId: z.string().uuid(),
	amount: z.number()
})

type CreateTransactionBodySchema = z.infer<typeof createTransactionBodySchema>

@Controller('/transaction/transfer')
@UseGuards(JwtAuthGuard)
export class CreateTransactionController {
	constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
	async handle(
    @Body(new ZodValidationPipe(createTransactionBodySchema)) body: CreateTransactionBodySchema,
    @CurrentUser() user: UserPayload
	) {
		const { receiverId, amount } = body
		const userId = user.sub

		const userExistis = await this.prisma.user.findUnique({
			where: {
				id: userId,
			}
		})

		if (!userExistis) {
			throw new NotFoundException(
				'Receiver does not exists'
			)
		}

		// const senderWallet = await this.prisma.wallet.findUnique({
		// 	where: {
		// 		userId,
		// 	}
		// })

		const transaction = await this.prisma.transaction.create({
			data:  {
				amount,
				receiverId,
				senderId: userId,
				status: 'completed'
			}
		})

		return {
			transactionId: transaction.id,
			status: transaction.status
		}
	}
}