import { IteracijaProjekta } from "src/resources/iteracija-projekta/entities/iteracija-projekta.entity";
import { Korisnik } from "src/resources/korisnik/entities/korisnik.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class KorisnikIteracija {

    @PrimaryColumn()
    korisnik_id:number;

    @ManyToOne(() => Korisnik, korisnik => korisnik.korisnikIteracije, {
    onDelete: 'CASCADE'})
    @JoinColumn({ name: 'korisnik_id' })
    korisnik: Korisnik;

    @PrimaryColumn()
    iteracija_id:number;

    @ManyToOne(() => IteracijaProjekta, iteracija => iteracija.korisnikIteracije)
    @JoinColumn({ name: 'iteracija_id' })
    iteracija: IteracijaProjekta;
}
 