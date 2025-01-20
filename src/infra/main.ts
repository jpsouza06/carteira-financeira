import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get<ConfigService<Env, true>>(ConfigService)
	const port  = configService.get('PORT', {infer: true})

	const config = new DocumentBuilder()
		.setTitle('Carteira Financeira')
		.addBearerAuth()
		.setVersion('1.0')
		.build()
	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, documentFactory)

	await app.listen(port)
}
bootstrap()
