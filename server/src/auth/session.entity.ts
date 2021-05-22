import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('session')
export class Session {
	@PrimaryColumn({ type: 'varchar' })
	email: string;

	@PrimaryColumn({ type: 'varchar' })
	password: string;

	@Column({ type: 'varchar', length: 16 })
	token: string;
}
