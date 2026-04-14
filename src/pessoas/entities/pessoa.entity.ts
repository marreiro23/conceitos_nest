import { Recado } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  passwordHash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  // Uma pessoa pode enviar muitos recados (como "de").
  // Esses recados sao relacionados ao campo "de" da entidade Recado.
  @OneToMany(() => Recado, recado => recado.de)
  recadosEnviados: Recado[];

  // Uma pessoa pode receber muitos recados (como "para").
  // Esses recados sao relacionados ao campo "para" da entidade Recado.
  @OneToMany(() => Recado, recado => recado.para)
  recadosRecebidos: Recado[];
}
