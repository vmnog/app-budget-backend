import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateBudgets1599707932175 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "budgets",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "dev_amount",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "designer_amount",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "sm_amount",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "po_amount",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "days_amount",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "total_price",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "budgets",
            new TableForeignKey({
                name: "BudgetUserOwner",
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("budgets", "BudgetUserOwner");
        await queryRunner.dropTable("budgets");
    }
}
