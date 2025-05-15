import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UsersModule, SharedModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
