import 'dotenv/config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'postgres',
  password: 'lozinka',
  database: 'napredni_rmt_baza',
  synchronize: false,
});

const finansijskiPartneri = [
  { naziv: 'Banca Intesa Beograd',  websajt: 'https://www.bancaintesa.rs',          kontakt: 'info@bancaintesa.rs' },
  { naziv: 'Raiffeisen Banka',      websajt: 'https://www.raiffeisenbank.rs',        kontakt: 'kontakt@raiffeisenbank.rs' },
  { naziv: 'UniCredit Bank Srbija', websajt: 'https://www.unicreditbank.rs',         kontakt: 'info@unicreditbank.rs' },
  { naziv: 'Erste Bank',            websajt: 'https://www.erstebank.rs',             kontakt: 'info@erstebank.rs' },
  { naziv: 'NLB Komercijalna',      websajt: 'https://www.nlbkb.rs',                kontakt: 'kontakt@nlbkb.rs' },
  { naziv: 'Telekom Srbija',        websajt: 'https://www.telekom.rs',              kontakt: 'info@telekom.rs' },
  { naziv: 'Microsoft Srbija',      websajt: 'https://www.microsoft.com/sr-latn-rs', kontakt: 'serbia@microsoft.com' },
  { naziv: 'Nordeus',               websajt: 'https://www.nordeus.com',             kontakt: 'info@nordeus.com' },
  { naziv: 'Comtrade Group',        websajt: 'https://www.comtrade.com',            kontakt: 'info@comtrade.com' },
  { naziv: 'Levi9 Serbia',          websajt: 'https://www.levi9.com',               kontakt: 'serbia@levi9.com' },
  { naziv: 'Endava Srbija',         websajt: 'https://www.endava.com',              kontakt: 'serbia@endava.com' },
  { naziv: 'Asseco SEE',            websajt: 'https://www.assecosee.rs',            kontakt: 'info@assecosee.rs' },
  { naziv: 'SAGA',                  websajt: 'https://www.saga.rs',                 kontakt: 'office@saga.rs' },
  { naziv: 'NIS',                   websajt: 'https://www.nis.rs',                  kontakt: 'kontakt@nis.rs' },
  { naziv: 'MK Group',              websajt: 'https://www.mkgroup.rs',              kontakt: 'info@mkgroup.rs' },
];

const robniPartneri = [
  { naziv: 'Stark',                 websajt: 'https://www.stark.rs',                kontakt: 'info@stark.rs' },
  { naziv: 'Bambi',                 websajt: 'https://www.bambi.rs',                kontakt: 'info@bambi.rs' },
  { naziv: 'Jaffa',                 websajt: 'https://www.jaffa.rs',                kontakt: 'jaffa@jaffa.rs' },
  { naziv: 'Swisslion',             websajt: 'https://www.swisslion.com',           kontakt: 'info@swisslion.com' },
  { naziv: 'Domaće Kiflice',        websajt: 'https://www.domacekiflice.rs',        kontakt: 'info@domacekiflice.rs' },
  { naziv: 'Imlek',                 websajt: 'https://www.imlek.rs',                kontakt: 'potrosaci@imlek.rs' },
  { naziv: 'Frikom',                websajt: 'https://www.frikom.com',              kontakt: 'info@frikom.com' },
  { naziv: 'Pionir',                websajt: 'https://www.pionir.rs',               kontakt: 'info@pionir.rs' },
  { naziv: 'Knjaz Miloš',           websajt: 'https://www.knjazmilos.rs',           kontakt: 'info@knjazmilos.rs' },
  { naziv: 'Dijamant',              websajt: 'https://www.dijamant.rs',             kontakt: 'info@dijamant.rs' },
  { naziv: 'Mlekara Subotica',      websajt: 'https://www.mlekara-subotica.rs',     kontakt: 'info@mlekara-subotica.rs' },
  { naziv: 'Heineken Srbija',       websajt: 'https://www.heineken.com/rs',         kontakt: 'info.serbia@heineken.com' },
  { naziv: 'Coca-Cola HBC Srbija',  websajt: 'https://rs.coca-colahbc.com',         kontakt: 'info@cchellenic.rs' },
  { naziv: 'Apatinska pivara',      websajt: 'https://www.apatinskapivara.rs',      kontakt: 'info@apatinskapivara.rs' },
  { naziv: 'Perutnina Ptuj',        websajt: 'https://www.perutnina.com',           kontakt: 'info@perutnina.rs' },
];

async function seed() {
  await AppDataSource.initialize();

  await AppDataSource.query(`DELETE FROM kompanija_iteracija`);
  await AppDataSource.query(`DELETE FROM kompanija`);
  console.log('Obrisani svi partneri i veze.');

  for (const k of finansijskiPartneri) {
    await AppDataSource.query(
      `INSERT INTO kompanija (naziv, websajt, kontakt, tip) VALUES ($1, $2, $3, $4)`,
      [k.naziv, k.websajt, k.kontakt, 'finansijski'],
    );
    console.log(`  [finansijski] ${k.naziv}`);
  }

  for (const k of robniPartneri) {
    await AppDataSource.query(
      `INSERT INTO kompanija (naziv, websajt, kontakt, tip) VALUES ($1, $2, $3, $4)`,
      [k.naziv, k.websajt, k.kontakt, 'robni'],
    );
    console.log(`  [robni]       ${k.naziv}`);
  }

  const users = [
    { username: 'admin',     lozinka: 'admin123',     ime: 'Admin', prezime: 'Korisnik', tip: 'admin' },
    { username: 'kompanija', lozinka: 'kompanija123', ime: 'Test',  prezime: 'Kompanija', tip: 'kompanija' },
  ];

  for (const u of users) {
    const exists = await AppDataSource.query<{ id: number }[]>(
      `SELECT id FROM korisnik WHERE username = $1`,
      [u.username],
    );
    if (exists.length > 0) {
      await AppDataSource.query(
        `UPDATE korisnik SET lozinka=$1, ime=$2, prezime=$3, tip=$4 WHERE username=$5`,
        [u.lozinka, u.ime, u.prezime, u.tip, u.username],
      );
      console.log(`Ažuriran korisnik: ${u.username}`);
    } else {
      await AppDataSource.query(
        `INSERT INTO korisnik (username, lozinka, ime, prezime, tip) VALUES ($1,$2,$3,$4,$5)`,
        [u.username, u.lozinka, u.ime, u.prezime, u.tip],
      );
      console.log(`Kreiran korisnik: ${u.username}`);
    }
  }

  await AppDataSource.destroy();

  console.log('\nSeed završen!');
  console.log(`  ${finansijskiPartneri.length} finansijskih partnera`);
  console.log(`  ${robniPartneri.length} robnih partnera`);
  console.log('  admin     / admin123');
  console.log('  kompanija / kompanija123');
}

seed().catch((err) => {
  console.error('Seed greška:', err);
  process.exit(1);
});
