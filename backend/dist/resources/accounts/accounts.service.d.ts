import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { BlacklistedToken } from 'src/auth/entities/blacklisted-token.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { LoginDto } from './dto/login.dto';
export declare class AccountsService {
    private readonly korisnikRepository;
    private readonly blacklistedTokenRepository;
    private readonly jwtService;
    constructor(korisnikRepository: Repository<Korisnik>, blacklistedTokenRepository: Repository<BlacklistedToken>, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        token: string;
        refreshToken: string;
        roles: import("../../enums/tip-korisnika").TipKorisnika[];
    }>;
    refresh(refreshToken: string): Promise<{
        token: string;
        refreshToken: string;
    }>;
    logout(userId: number, jti: string, exp: number): Promise<void>;
    me(userId: number): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        initials: string;
        thumbUrl: string;
        dateVerificationCodeExpires: string;
        createdAt: string;
    }>;
    private generateTokens;
}
