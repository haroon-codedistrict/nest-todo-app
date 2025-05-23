import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenService } from './jwttoken.service';

describe('JwtTokenService', () => {
    let service: JwtTokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JwtTokenService],
        }).compile();

        service = module.get<JwtTokenService>(JwtTokenService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
