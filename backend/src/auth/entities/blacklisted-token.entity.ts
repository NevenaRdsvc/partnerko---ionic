import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlacklistedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  jti: string;

  @Column()
  expiresAt: Date;
}
