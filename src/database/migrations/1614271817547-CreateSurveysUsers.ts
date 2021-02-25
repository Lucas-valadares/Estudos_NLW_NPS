import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614271817547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "users_id",
                        type: "uuid",
                    },
                    {
                        name: "surveys_id",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],   
                foreignKeys: [
                    {
                        name: "FK_Users",
                        referencedTableName: "users",
                        referencedColumnNames: [ "id" ],
                        columnNames: [ "users_id" ],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FK_Surveys",
                        referencedTableName: "surveys",
                        referencedColumnNames: [ "id" ],
                        columnNames: [ "surveys_id" ],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users");
    };

};
