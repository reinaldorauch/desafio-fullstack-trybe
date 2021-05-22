import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSession1621663561323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(new Table({
         name: 'session',
         columns: [
           { name: "email", type: "varchar(45)", isPrimary: true },
           { name: "password", type: "varchar(6)", isPrimary: true },
           { name: "token", type: "varchar(12)" },
         ]
       }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('session');
    }

}
