import { IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Etnia } from "../enums/etnia.enum";
import { Role } from "../../role/entities/role.entity";
import { Endereco } from "../../endereco/entities/endereco.entity";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @Column({ length: 100 , nullable: false })
  nome: string;
  
  @IsNotEmpty()
  @Column({ length: 20 , nullable: false })
  telefone: string;
  
  @IsNotEmpty()
  @Column({ length: 50 , nullable: false, unique: true })
  email: string;
  
  @IsNotEmpty()
  @MinLength(6)
  @Column({ length: 200 , nullable: false })
  senha: string;

  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  idade: number;

  @IsNotEmpty()
  @Column({ type: 'decimal' , nullable: false })
  peso: number;

  @IsNotEmpty()
  @Column({ type: 'enum' , enum: Etnia, nullable: false })
  etnia: Etnia;

  @ManyToOne(() => Role, (role) => role.usuarios)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Endereco, endereco => endereco.usuario)
  enderecos: Endereco[];
}
