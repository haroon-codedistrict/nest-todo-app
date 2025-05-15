import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), SharedModule],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule {}
