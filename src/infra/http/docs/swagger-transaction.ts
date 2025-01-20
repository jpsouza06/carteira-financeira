import { ApiResponseOptions } from '@nestjs/swagger'

export const schemaCreateResponseCreated: ApiResponseOptions = {
	status: 201, 
	description: 'Created',
}

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

export const schemaCreateResponseUnprocessableEntity: ApiResponseOptions = {
	status: 422, 
	description: 'Unprocessable Entity',
	example: {
		message: 'Not enough balance.',
		error: 'Unprocessable Entity',
		statusCode: 422
	}
}