import { Kompanija } from 'src/resources/kompanija/entities/kompanija.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Materijali {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  javniId: string;

  @Column()
  originalnoIme: string;

  @Column()
  imeCloud: string;

  @CreateDateColumn()
  datumKreiranja: Date;

  @Column()
  kompanija_id: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @ManyToOne(() => Kompanija, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'kompanija_id' })
  kompanija: Kompanija;
}
