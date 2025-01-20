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

export const schemaCreateResponseNotFound: ApiResponseOptions = {
	status: 404, 
	description: 'Not Found',
	example: {
		message: 'Receiver wallet not found.',
		error: 'Not Found',
		statusCode: 404
	}
}
