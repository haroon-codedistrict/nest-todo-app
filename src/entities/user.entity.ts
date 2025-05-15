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
import { HashingService } from 'src/modules/shared/hashing/hashing.service';

@Entity('users')
@Check(`"created_at" >= 0`)
@Check(`"updated_at" >= 0`)
export class User {

constructor(
        private readonly hashingService: HashingService,
    ) {
        console.log('UserEntity initialized');
    }
    
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
    created_at: number;

    @Column({
        type: 'bigint',
        nullable: true,
    })
    updated_at: number;

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

    @BeforeInsert()
    setCreatedAtEpoch() {
        const now = Math.floor(Date.now() / 1000); // epoch in seconds

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
            this.updated_at = Math.floor(Date.now() / 1000);
        }
    }
}
