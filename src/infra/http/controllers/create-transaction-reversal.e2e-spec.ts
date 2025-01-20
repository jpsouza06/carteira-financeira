import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { PrismaTransactionMapper } from '@/infra/database/prisma/mappers/prisma-transaction-mapper'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'
import { PrismaWalletMapper } from '@/infra/database/prisma/mappers/prisma-wallet-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'
import request from 'supertest'
import { makeTransaction } from 'test/factories/make-transaction'
import { makeUser } from 'test/factories/make-user'
import { makeWallet } from 'test/factories/make-wallet'

describe('Create transaction reversal (E2E)', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleRef.createNestApplication()

		prisma = moduleRef.get(PrismaService)
		jwt = moduleRef.get(JwtService)

		await app.init()
	})

	afterAll(async () => {
		await app.close()
	})
  
	test('[POST] /transaction/reversal', async () => {
		const sender = makeUser({}, new UniqueEntityId(randomUUID()))
		const receiver = makeUser({}, new UniqueEntityId(randomUUID()))
    
		await prisma.user.create({
			data: PrismaUserMapper.toPrisma(sender)
		})
    
		await prisma.user.create({
			data: PrismaUserMapper.toPrisma(receiver)
		})
    
		const walletSender = makeWallet({userId: sender.id, balance: new Decimal('200')})
        
		await prisma.wallet.create({
			data: PrismaWalletMapper.toPrisma(walletSender)
		})
    
		const walletReceiver = makeWallet({userId: receiver.id, balance: new Decimal('100')})
            
		await prisma.wallet.create({
			data: PrismaWalletMapper.toPrisma(walletReceiver)
		})

		const transaction = makeTransaction({
			receiverId: receiver.id, 
			senderId: sender.id,
			amount: new Decimal('100.20'),
			status: 'completed'
		},
		new UniqueEntityId(randomUUID()))

		await prisma.transaction.create({
			data: PrismaTransactionMapper.toPrisma(transaction)
		})
        
		const accessToken = jwt.sign({ sub: sender.id.toString() })
    
		const response = await request(app.getHttpServer())
			.post('/transaction/reversal')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				transactionId: transaction.id.toString(),
				reason: 'Refound'
			})  
    
		expect(response.statusCode).toBe(201)
    
		const transactionReversalOnDatabase = await prisma.transactionReversal.findFirst({
			where: {
				transactionId: transaction.id.toString()
			}
		})
    
		expect(transactionReversalOnDatabase).toBeTruthy()
	})
})