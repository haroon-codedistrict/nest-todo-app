import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { HashingService } from 'src/modules/shared/hashing/hashing.service';
import { JwtTokenService } from 'src/modules/shared/jwttoken/jwttoken.service';
import { apiSuccessResponse } from 'src/utils/helpers/common.helper';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly hashingService: HashingService,
        private readonly jwtTokenService: JwtTokenService,
        private readonly userService: UserService,
    ) {
        console.log('AuthService initialized');
    }

    async register(data: RegisterDto) {
        try {
            const user = await this.userService.findByEmail(data.email);
            if (user) {
                throw new ConflictException('User already exists.');
            }

            if (data.password !== data.password_confirmation) {
                throw new HttpException('Passwords do not match.', HttpStatus.UNPROCESSABLE_ENTITY);
            }

            let newUser = await this.userService.create({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
            });

            if (!newUser) {
                throw new HttpException('User registration failed.', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return apiSuccessResponse(HttpStatus.CREATED, 'Registeration successful.', {
                ...newUser,
                token: await this.jwtTokenService.generateToken(user),
            });

        } catch (error) {
            console.error('Error in AuthService.register method:', error);
            throw error;
        }
    }

    async login(data: LoginDto) {
        try {
            const user = await this.userService.findByEmail(data.email);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            if (!(await this.hashingService.check(data.password, user.password))) {
                throw new UnauthorizedException('Invalid credentials');
            }

            return apiSuccessResponse(HttpStatus.OK, 'Login successful.', {
                ...user,
                token: await this.jwtTokenService.generateToken(user),
            });
        } catch (error) {
            console.error('Error in AuthService.login method:', error);
            throw error;
        }
    }
}
