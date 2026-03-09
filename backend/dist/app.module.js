"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const blacklisted_token_entity_1 = require("./auth/entities/blacklisted-token.entity");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const roles_guard_1 = require("./auth/roles.guard");
const accounts_module_1 = require("./resources/accounts/accounts.module");
const iteracija_projekta_module_1 = require("./resources/iteracija-projekta/iteracija-projekta.module");
const kompanija_iteracija_module_1 = require("./resources/kompanija-iteracija/kompanija-iteracija.module");
const kompanija_module_1 = require("./resources/kompanija/kompanija.module");
const korisnik_iteracija_module_1 = require("./resources/korisnik-iteracija/korisnik-iteracija.module");
const korisnik_module_1 = require("./resources/korisnik/korisnik.module");
const materijali_module_1 = require("./resources/materijali/materijali.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5431,
                username: 'postgres',
                password: 'lozinka',
                database: 'napredni_rmt_baza',
                autoLoadEntities: true,
                synchronize: true,
            }),
            jwt_1.JwtModule.register({}),
            typeorm_1.TypeOrmModule.forFeature([blacklisted_token_entity_1.BlacklistedToken]),
            kompanija_module_1.KompanijaModule,
            korisnik_module_1.KorisnikModule,
            iteracija_projekta_module_1.IteracijaProjektaModule,
            korisnik_iteracija_module_1.KorisnikIteracijaModule,
            kompanija_iteracija_module_1.KompanijaIteracijaModule,
            materijali_module_1.MaterijaliModule,
            accounts_module_1.AccountsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map