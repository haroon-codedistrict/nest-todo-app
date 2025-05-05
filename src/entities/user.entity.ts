import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Check,
    OneToMany,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Task } from './task.entity';
import { Directory } from './directory.entity';

@Entity('users')
@Check(`"created_at" >= 0`)
@Check(`"updated_at" >= 0`)
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'bigint',
        nullable: true,
    })
    created_at: string;

    @Column({
        type: 'bigint',
        nullable: true,
    })
    updated_at: string;

    @OneToMany(() => Directory, (dir) => dir.user_id)
    directories: Directory[];

    @OneToMany(() => Task, (task) => task.user_id)
    tasks: Task[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (!this.password) {
            return;
        }

        this.password = await argon2.hash(this.password);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await argon2.verify(this.password, password);
    }

    @BeforeInsert()
    setCreatedAtEpoch() {
        const now = Math.floor(Date.now() / 1000).toString(); // epoch in seconds

        if (!this.created_at) {
            this.created_at = now;
        }

        if (!this.updated_at) {
            this.updated_at = now;
        }
    }

    @BeforeUpdate()
    setUpdatedAtEpoch() {
        if (!this.updated_at) {
            this.updated_at = Math.floor(Date.now() / 1000).toString();
        }
    }
}
