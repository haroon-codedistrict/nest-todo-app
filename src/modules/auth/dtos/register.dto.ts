import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: { value: string }) => value.trim())
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: { value: string }) => value.trim())
    last_name: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Invalid email address format',
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Transform(({ value }: { value: string }) => value.trim())
    @Matches(/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
            'Password must be at least 8 characters long and include at least one number and one special character',
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }: { value: string }) => value.trim())
    @Matches(/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
            'Confirm Password must be at least 8 characters long and include at least one number and one special character',
    })
    password_confirmation: string;
}
