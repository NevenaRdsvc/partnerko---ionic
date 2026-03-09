import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { BlacklistedToken } from './entities/blacklisted-token.entity';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflector;
    private readonly blacklistedTokenRepository;
    constructor(jwtService: JwtService, reflector: Reflector, blacklistedTokenRepository: Repository<BlacklistedToken>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
