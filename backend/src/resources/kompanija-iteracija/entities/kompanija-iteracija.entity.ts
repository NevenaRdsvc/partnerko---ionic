import { TipPartnera } from "src/enums/tip-partnera";
import { IteracijaProjekta } from "src/resources/iteracija-projekta/entities/iteracija-projekta.entity";
import { Kompanija } from "src/resources/kompanija/entities/kompanija.entity";
import { Korisnik } from "src/resources/korisnik/entities/korisnik.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class KompanijaIteracija {

    @PrimaryColumn()
    kompanija_id: number;

    @ManyToOne(() => Kompanija, kompanija => kompanija.kompanijaIteracije)
    @JoinColumn({ name: 'kompanija_id' })
    kompanija: Kompanija;

    @PrimaryColumn()
    iteracija_id: number;

    @ManyToOne(() => IteracijaProjekta, iteracija => iteracija.kompanijaIteracije)
    @JoinColumn({ name: 'iteracija_id' })
    iteracija:IteracijaProjekta;

    @Column()
    tip_partnera: TipPartnera;

    @Column({ type: 'date', nullable: true })
    datum_cimanja: Date;

    @Column({ type: 'date', nullable: true })
    datum_podsetnik: Date;

    @Column({ type: 'date', nullable: true })
    datum_poziv: Date;

    @Column({ nullable: true, type: 'boolean' })
    odobrena: boolean | null;

    @Column({ nullable: true, type: 'varchar' })
    stanje: string;

    @Column({ nullable: true, type: 'text' })
    napomena: string;

    @ManyToOne(() => Korisnik, korisnik => korisnik.ki)
    @JoinColumn({ name: 'korisnik_id' })
    korisnik:Korisnik;
}
