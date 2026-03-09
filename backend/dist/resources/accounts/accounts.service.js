"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const blacklisted_token_entity_1 = require("../../auth/entities/blacklisted-token.entity");
const korisnik_entity_1 = require("../korisnik/entities/korisnik.entity");
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'rmt-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'rmt-refresh-secret';
let AccountsService = class AccountsService {
    constructor(korisnikRepository, blacklistedTokenRepository, jwtService) {
        this.korisnikRepository = korisnikRepository;
        this.blacklistedTokenRepository = blacklistedTokenRepository;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const korisnik = await this.korisnikRepository.findOne({
            where: { username: loginDto.username },
            relations: { korisnikIteracije: true },
        });
        if (!korisnik) {
            throw new common_1.UnauthorizedException('Pogrešno korisničko ime ili lozinka.');
        }
        if (loginDto.password !== korisnik.lozinka) {
            throw new common_1.UnauthorizedException('Pogrešno korisničko ime ili lozinka.');
        }
        const latestIteracija = korisnik.korisnikIteracije
            ?.sort((a, b) => b.iteracija_id - a.iteracija_id)[0];
        const { accessToken, refreshToken } = await this.generateTokens(korisnik.id, korisnik.username, korisnik.tip, latestIteracija?.iteracija_id ?? null);
        return { token: accessToken, refreshToken, roles: [korisnik.tip] };
    }
    async refresh(refreshToken) {
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken, { secret: REFRESH_SECRET });
        }
        catch {
            throw new common_1.UnauthorizedException('Refresh token je nevažeći ili je istekao.');
        }
        const korisnik = await this.korisnikRepository.findOne({
            where: { id: payload.sub },
            relations: { korisnikIteracije: true },
        });
        if (!korisnik || !korisnik.refresh_token) {
            throw new common_1.UnauthorizedException('Refresh token je nevažeći.');
        }
        const tokenMatch = await bcrypt.compare(refreshToken, korisnik.refresh_token);
        if (!tokenMatch) {
            throw new common_1.UnauthorizedException('Refresh token je nevažeći.');
        }
        const latestIteracija = korisnik.korisnikIteracije
            ?.sort((a, b) => b.iteracija_id - a.iteracija_id)[0];
        const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(korisnik.id, korisnik.username, korisnik.tip, latestIteracija?.iteracija_id ?? null);
        return { token: accessToken, refreshToken: newRefreshToken };
    }
    async logout(userId, jti, exp) {
        await this.korisnikRepository.update(userId, { refresh_token: null });
        const expiresAt = new Date(exp * 1000);
        await this.blacklistedTokenRepository.save({ jti, expiresAt });
        await this.blacklistedTokenRepository
            .createQueryBuilder()
            .delete()
            .where('"expiresAt" < :now', { now: new Date() })
            .execute();
    }
    async me(userId) {
        const korisnik = await this.korisnikRepository.findOneBy({ id: userId });
        if (!korisnik)
            throw new common_1.UnauthorizedException();
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
    async generateTokens(userId, username, roles, iteracijaId) {
        const accessPayload = { jti: (0, crypto_1.randomUUID)(), sub: userId, username, roles, iteracija_id: iteracijaId };
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
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(korisnik_entity_1.Korisnik)),
    __param(1, (0, typeorm_1.InjectRepository)(blacklisted_token_entity_1.BlacklistedToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map