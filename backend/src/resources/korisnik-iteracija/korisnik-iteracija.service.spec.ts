import { Test, TestingModule } from '@nestjs/testing';
import { KorisnikIteracijaService } from './korisnik-iteracija.service';

describe('KorisnikIteracijaService', () => {
  let service: KorisnikIteracijaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KorisnikIteracijaService],
    }).compile();

    service = module.get<KorisnikIteracijaService>(KorisnikIteracijaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
