import { Test, TestingModule } from '@nestjs/testing';
import { KorisnikController } from './korisnik.controller';
import { KorisnikService } from './korisnik.service';

describe('KorisnikController', () => {
  let controller: KorisnikController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KorisnikController],
      providers: [KorisnikService],
    }).compile();

    controller = module.get<KorisnikController>(KorisnikController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
