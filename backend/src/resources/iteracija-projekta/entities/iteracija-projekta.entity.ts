import { NazivProjekta } from "src/enums/naziv-projekta";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
import { KorisnikIteracija } from "src/resources/korisnik-iteracija/entities/korisnik-iteracija.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class IteracijaProjekta {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    naziv_projekta:NazivProjekta;

    @Column()
    godina:number;

    @OneToMany(() => KorisnikIteracija, ki => ki.iteracija)
    korisnikIteracije: KorisnikIteracija[];

    @OneToMany(() => KompanijaIteracija, ki => ki.iteracija)
    kompanijaIteracije: KompanijaIteracija[];
}
