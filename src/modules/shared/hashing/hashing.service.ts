import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
    constructor() {
        console.log('HashingService initialized');
    }

    async hash(password: string): Promise<string> {
        return await argon2.hash(password, { type: argon2.argon2id });
    }

    async check(password: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, password);
    }
}
