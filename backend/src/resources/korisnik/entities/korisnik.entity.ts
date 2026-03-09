import { TipKorisnika } from "src/enums/tip-korisnika";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
import { KorisnikIteracija } from "src/resources/korisnik-iteracija/entities/korisnik-iteracija.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Korisnik {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username:string;

    @Column()
    lozinka:string;

    @Column()
    ime:string;

    @Column()
    prezime:string;

    @Column()
    tip:TipKorisnika;

    @Column({ nullable: true, type: 'text' })
    refresh_token: string | null;

    @OneToMany(() => KompanijaIteracija, ki => ki.korisnik)
    ki:KompanijaIteracija[];

    @OneToMany(() => KorisnikIteracija, ki => ki.korisnik)
    korisnikIteracije: KorisnikIteracija[];
}
