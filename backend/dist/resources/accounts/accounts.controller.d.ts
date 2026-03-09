import { AccountsService } from './accounts.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    login(loginDto: LoginDto): Promise<{
        token: string;
        refreshToken: string;
        roles: import("../../enums/tip-korisnika").TipKorisnika[];
    }>;
    refresh(body: RefreshDto): Promise<{
        token: string;
        refreshToken: string;
    }>;
    logout(req: any): Promise<void>;
    me(req: any): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        initials: string;
        thumbUrl: string;
        dateVerificationCodeExpires: string;
        createdAt: string;
    }>;
}
