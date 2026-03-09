import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlacklistedToken } from './auth/entities/blacklisted-token.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { AccountsModule } from './resources/accounts/accounts.module';
import { IteracijaProjektaModule } from './resources/iteracija-projekta/iteracija-projekta.module';
import { KompanijaIteracijaModule } from './resources/kompanija-iteracija/kompanija-iteracija.module';
import { KompanijaModule } from './resources/kompanija/kompanija.module';
import { KorisnikIteracijaModule } from './resources/korisnik-iteracija/korisnik-iteracija.module';
import { KorisnikModule } from './resources/korisnik/korisnik.module';
import { MaterijaliModule } from './resources/materijali/materijali.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'lozinka',
      database: 'napredni_rmt_baza',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([BlacklistedToken]),
    KompanijaModule,
    KorisnikModule,
    IteracijaProjektaModule,
    KorisnikIteracijaModule,
    KompanijaIteracijaModule,
    MaterijaliModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
