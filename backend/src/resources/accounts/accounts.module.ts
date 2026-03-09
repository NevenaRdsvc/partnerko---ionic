import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedToken } from 'src/auth/entities/blacklisted-token.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Korisnik, BlacklistedToken]),
    JwtModule.register({}),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
