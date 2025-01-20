import { ApiResponseOptions } from '@nestjs/swagger'

export const schemaCreateResponseBadRequest: ApiResponseOptions = {
	status: 400, 
	description: 'Bad Request',
	example: {
		message: 'Bad Request',
		error: 'Bad Request',
		statusCode: 400
	}
}

export const schemaCreateResponseUnauthorized: ApiResponseOptions = {
	status: 401, 
	description: 'Unauthorized',
	example: {
		message: 'Credentials are not valid.',
		error: 'Unauthorized',
		statusCode: 401
	}
}
