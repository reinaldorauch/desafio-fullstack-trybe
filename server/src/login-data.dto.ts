import { IsEmail, IsNumberString, Length } from 'class-validator';

export class LoginDataDto {
	@IsEmail()
	email: string;

	@IsNumberString()
	@Length(6, 6)
	password: string;

	static create(email: string, password: string) {
		const dto = new LoginDataDto();

		dto.email = email;
		dto.password = password;

		return dto;
	}
}
