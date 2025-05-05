import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Check,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Directory } from './directory.entity';

@Entity('tasks')
@Check(`"created_at" >= 0`)
@Check(`"updated_at" >= 0`)
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.tasks)
    user_id: User;

    @ManyToOne(() => Directory, (dir) => dir.tasks)
    directory_id: Directory;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    priority: number;

    @Column({
        type: 'bigint',
        nullable: true,
    })
    due_date: number;

    @Column()
    status: string;

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
