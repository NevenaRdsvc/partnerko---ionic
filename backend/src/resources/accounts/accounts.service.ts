import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { BlacklistedToken } from 'src/auth/entities/blacklisted-token.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { LoginDto } from './dto/login.dto';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'rmt-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'rmt-refresh-secret';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Korisnik)
    private readonly korisnikRepository: Repository<Korisnik>,
    @InjectRepository(BlacklistedToken)
    private readonly blacklistedTokenRepository: Repository<BlacklistedToken>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const korisnik = await this.korisnikRepository.findOne({
      where: { username: loginDto.username },
      relations: { korisnikIteracije: true },
    });

    if (!korisnik) {
      throw new UnauthorizedException('Pogrešno korisničko ime ili lozinka.');
    }

    if (loginDto.password !== korisnik.lozinka) {
      throw new UnauthorizedException('Pogrešno korisničko ime ili lozinka.');
    }

    const latestIteracija = korisnik.korisnikIteracije
      ?.sort((a, b) => b.iteracija_id - a.iteracija_id)[0];

    const { accessToken, refreshToken } = await this.generateTokens(
      korisnik.id,
      korisnik.username,
      korisnik.tip,
      latestIteracija?.iteracija_id ?? null,
    );

    return { token: accessToken, refreshToken, roles: [korisnik.tip] };
  }

  async refresh(refreshToken: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, { secret: REFRESH_SECRET });
    } catch {
      throw new UnauthorizedException('Refresh token je nevažeći ili je istekao.');
    }

    const korisnik = await this.korisnikRepository.findOne({
      where: { id: payload.sub },
      relations: { korisnikIteracije: true },
    });

    if (!korisnik || !korisnik.refresh_token) {
      throw new UnauthorizedException('Refresh token je nevažeći.');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, korisnik.refresh_token);
    if (!tokenMatch) {
      throw new UnauthorizedException('Refresh token je nevažeći.');
    }

    const latestIteracija = korisnik.korisnikIteracije
      ?.sort((a, b) => b.iteracija_id - a.iteracija_id)[0];

    const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(
      korisnik.id,
      korisnik.username,
      korisnik.tip,
      latestIteracija?.iteracija_id ?? null,
    );

    return { token: accessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: number, jti: string, exp: number) {
    await this.korisnikRepository.update(userId, { refresh_token: null });

    const expiresAt = new Date(exp * 1000);
    await this.blacklistedTokenRepository.save({ jti, expiresAt });

    await this.blacklistedTokenRepository
      .createQueryBuilder()
      .delete()
      .where('"expiresAt" < :now', { now: new Date() })
      .execute();
  }

  async me(userId: number) {
    const korisnik = await this.korisnikRepository.findOneBy({ id: userId });
    if (!korisnik) throw new UnauthorizedException();

    return {
      id: String(korisnik.id),
      firstName: korisnik.ime,
      lastName: korisnik.prezime,
      initials: `${korisnik.ime[0]}${korisnik.prezime[0]}`,
      thumbUrl: '',
      dateVerificationCodeExpires: '',
      createdAt: '',
    };
  }

  private async generateTokens(
    userId: number,
    username: string,
    roles: string,
    iteracijaId: number | null,
  ) {
    const accessPayload = { jti: randomUUID(), sub: userId, username, roles, iteracija_id: iteracijaId };
    const refreshPayload = { sub: userId };

    const accessToken = this.jwtService.sign(accessPayload, {
      secret: ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: REFRESH_SECRET,
      expiresIn: '7d',
    });

    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.korisnikRepository.update(userId, { refresh_token: hashedRefresh });

    return { accessToken, refreshToken };
  }
}
