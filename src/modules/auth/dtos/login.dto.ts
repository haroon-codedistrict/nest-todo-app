import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
    email: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.trim())
    password: string;
}
