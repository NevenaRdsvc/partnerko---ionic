import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Roles } from 'src/auth/roles.decorator';
import { TipKorisnika } from 'src/enums/tip-korisnika';
import { MaterijaliService } from './materijali.service';
import { CreateMaterijaliDto } from './dto/create-materijali.dto';

@Controller('materijali')
export class MaterijaliController {
  constructor(private readonly materijaliService: MaterijaliService) {}

  @Roles(TipKorisnika.ADMIN, TipKorisnika.KOORDINATOR)
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateMaterijaliDto,
  ) {
    if (!file) throw new BadRequestException('Fajl je obavezan.');
    return this.materijaliService.uploadMaterijal(file, body.kompanija_id);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.materijaliService.findAll(search);
  }

  @Get('kompanije')
  findKompanije() {
    return this.materijaliService.findKompanije();
  }

  @Roles(TipKorisnika.ADMIN)
  @Post('sync-tags')
  @HttpCode(200)
  syncTags() {
    return this.materijaliService.syncTags();
  }

  @Roles(TipKorisnika.ADMIN, TipKorisnika.KOORDINATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materijaliService.remove(+id);
  }
}
