import { IsNotEmpty } from "class-validator";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ length: 100 , nullable: false })
  endereco: string
  
  @Column({ type: 'int' , nullable: false })
  numero: number
  
  @Column({ length: 50 , nullable: true })
  complemento: string
  
  @Column({ length: 9 , nullable: false })
  cep: string
  
  @Column({ length: 100 , nullable: false })
  cidade: string
  
  @Column({ length: 20 , nullable: false })
  estado: string
  
  @ManyToOne(() => Usuario, usuario => usuario.enderecos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}