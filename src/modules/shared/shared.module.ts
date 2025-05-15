import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { JwtTokenService } from './jwttoken/jwttoken.service';

@Module({
    providers: [HashingService, JwtTokenService],
    exports: [HashingService, JwtTokenService],
})
export class SharedModule {}
