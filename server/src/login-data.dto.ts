import { IsEmail, IsNumberString, Length } from 'class-validator';

export class LoginDataDto {
	@IsEmail()
	email: string;

	@IsNumberString()
	@Length(6, 6)
	password: string;
}