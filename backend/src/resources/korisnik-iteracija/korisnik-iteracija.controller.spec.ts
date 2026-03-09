import { Test, TestingModule } from '@nestjs/testing';
import { KorisnikIteracijaController } from './korisnik-iteracija.controller';
import { KorisnikIteracijaService } from './korisnik-iteracija.service';

describe('KorisnikIteracijaController', () => {
  let controller: KorisnikIteracijaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KorisnikIteracijaController],
      providers: [KorisnikIteracijaService],
    }).compile();

    controller = module.get<KorisnikIteracijaController>(KorisnikIteracijaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
