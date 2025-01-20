import { ApiResponseOptions } from '@nestjs/swagger'

export const schemaCreateResponseCreated: ApiResponseOptions = {
	status: 201, 
	description: 'Created',
	example: {
		user: {
			id: '155f18ac-57a6-4266-a399-78156bc7d038',
			name: 'teste',
			email: 'teste@email.com'
		}
	}
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

export const schemaCreateResponseConflict: ApiResponseOptions = {
	status: 409, 
	description: 'Conflict',
	example: {
		message: 'User "teste@email.com" already exists.',
		error: 'Conflict',
		statusCode: 409
	}
}
