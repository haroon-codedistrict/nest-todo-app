import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
        console.log('UserService initialized');
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.usersRepository.findOneBy({
                email: email,
            });

            return user;
        } catch (error) {
            console.error('Error in UserService.findByEmail method:', error);
            throw error;
        }
    }

    async create(data: CreateUserDto): Promise<User | null> {
        try {
            return await this.usersRepository.save(
                this.usersRepository.create({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                }),
            );
        } catch (error) {
            console.error('Error in UserService.create method:', error);
            throw error;
        }
    }
}
