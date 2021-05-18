import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('session')
export class Session {
	@PrimaryColumn({ type: 'varchar' })
	email: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'char', length: 16 })
	token: string;
}
