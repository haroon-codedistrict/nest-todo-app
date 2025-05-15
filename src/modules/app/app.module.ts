import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from '../../config/typeorm.config';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../../exceptions/filters/http-exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
