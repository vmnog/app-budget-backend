import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";

import User from "./User";

@Entity("budgets")
class Budget {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne((type) => User, (user) => user.budgets)
    @JoinColumn({ name: "id" })
    user: User;

    @Column()
    user_id: string;

    @Column("integer")
    dev_amount: number;

    @Column("integer")
    designer_amount: number;

    @Column("integer")
    sm_amount: number;

    @Column("integer")
    po_amount: number;

    @Column("integer")
    days_amount: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Budget;
