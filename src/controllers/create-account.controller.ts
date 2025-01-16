import { Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/account')
export class CreateAccountController {
	constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
	async handle(@Body() body: any) {
		const { name, email, password} = body

		const userWithSameEmail = await this.prisma.user.findUnique({
			where: {
				email,
			}
		})

		if (userWithSameEmail) {
			throw new ConflictException(
				'User with same e-mail addres already exists'
			)
		}

		await this.prisma.user.create({
			data:  {
				email,
				name,
				password_hash: password
			}
		})
	}
}