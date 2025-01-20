import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ApiProperty } from '@nestjs/swagger'

export interface UserProps {
   name: string
   email: string
   password: string
}

export class User extends Entity<UserProps> {
	@ApiProperty({ example: 'Teste', description: 'Nome do usuário' })
	get name() {
		return this.props.name
	}

	@ApiProperty({ example: 'teste@teste.com', description: 'Email do usuário' })
	get email() {
		return this.props.email
	}

	@ApiProperty({ example: '123456', description: 'Senha do usuário' })
	get password() {
		return this.props.password
	}

	static create(
		props: UserProps, 
		id?: UniqueEntityId
	) {
		const user = new User(props, id)

		return user
	}
}