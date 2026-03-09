import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterijaliService } from './materijali.service';
import { MaterijaliController } from './materijali.controller';
import { Materijali } from './entities/materijali.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Kompanija } from '../kompanija/entities/kompanija.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Materijali, Kompanija]),
    CloudinaryModule,
  ],
  controllers: [MaterijaliController],
  providers: [MaterijaliService],
})
export class MaterijaliModule {}
