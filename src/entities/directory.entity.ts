import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Check,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity('directories')
@Check(`"created_at" >= 0`)
@Check(`"updated_at" >= 0`)
export class Directory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.directories)
    user_id: User;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    description: string;

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

    @OneToMany(() => Task, (task) => task.directory_id)
    tasks: Task[];

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
