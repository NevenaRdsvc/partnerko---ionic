import { TipPartnera } from "src/enums/tip-partnera";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Kompanija {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    naziv:string;

    @Column()
    websajt:string;

    @Column()
    kontakt:string;

    @Column({ type: 'varchar' })
    tip: TipPartnera;

    @OneToMany(() => KompanijaIteracija, ki => ki.kompanija)
    kompanijaIteracije: KompanijaIteracija[];
}
