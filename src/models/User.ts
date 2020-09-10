import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import Budget from "./Budget";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany((type) => Budget, (budget) => budget.user)
    budgets: Budget[];

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
