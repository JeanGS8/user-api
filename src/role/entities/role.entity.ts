import { Usuario } from "../../usuario/entities/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  nome: string;

  @OneToMany(() => Usuario, (usuario) => usuario.role)
  usuarios: Usuario[];
}
