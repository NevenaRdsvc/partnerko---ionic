import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.accountsService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() body: RefreshDto) {
    return await this.accountsService.refresh(body.refreshToken);
  }

  @Post('logout')
  async logout(@Req() req: any) {
    return await this.accountsService.logout(req.user.sub, req.user.jti, req.user.exp);
  }

  @Get('me')
  async me(@Req() req: any) {
    return await this.accountsService.me(req.user.sub);
  }
}
