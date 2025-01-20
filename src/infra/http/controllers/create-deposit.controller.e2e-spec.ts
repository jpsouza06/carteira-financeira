import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AppModule } from '@/infra/app.module'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'
import { PrismaWalletMapper } from '@/infra/database/prisma/mappers/prisma-wallet-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import request from 'supertest'
import { makeUser } from 'test/factories/make-user'
import { makeWallet } from 'test/factories/make-wallet'

describe('Create transaction (E2E)', () => {
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
  
	test('[POST] /deposit', async () => {
		const id = randomUUID()
		const user = makeUser({}, new UniqueEntityId(id))

		await prisma.user.create({
			data: PrismaUserMapper.toPrisma(user)
		})

		const wallet = makeWallet({userId: user.id})

		await prisma.wallet.create({
			data: PrismaWalletMapper.toPrisma(wallet)
		})
    
		const accessToken = jwt.sign({ sub: user.id.toString() })

		const response = await request(app.getHttpServer())
			.post('/deposit')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				origin: 'Deposito via boleto',
				amount: '100.20'
			})  

		expect(response.statusCode).toBe(201)

		const transactionOnDatabase = await prisma.deposit.findFirst({
			where: {
				walletId: wallet.id.toString()
			}
		})

		expect(transactionOnDatabase).toBeTruthy()
	})
})