import { User } from '@/domain/wallet/enterprise/entities/user'

export class AccountPresenter {
	static toHttp(user: User) {
		return {
			id: user.id.toString(),
			name: user.name,
			email: user.email
		}
	}
}