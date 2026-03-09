import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistedToken } from './entities/blacklisted-token.entity';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @InjectRepository(BlacklistedToken)
    private readonly blacklistedTokenRepository: Repository<BlacklistedToken>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader: string = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Niste autentifikovani.');
    }

    const token = authHeader.split(' ')[1];
    let payload: any;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET || 'rmt-access-secret',
      });
    } catch {
      throw new UnauthorizedException('Token je nevažeći ili je istekao.');
    }

    const blacklisted = await this.blacklistedTokenRepository.findOneBy({ jti: payload.jti });
    if (blacklisted) {
      throw new UnauthorizedException('Token je poništen.');
    }

    request['user'] = payload;
    return true;
  }
}
