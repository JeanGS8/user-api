import { config } from 'dotenv';
config(); // carrega o .env

import { DataSource } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { Etnia } from '../usuario/enums/etnia.enum';
import { Endereco } from '../endereco/entities/endereco.entity';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  //ssl: { rejectUnauthorized: false },
  synchronize: false, // não recria tabelas
  entities: [Role, Usuario, Endereco], // suas entidades
});

async function seed() {
  await dataSource.initialize();
  console.log('DataSource initialized');

  const roleRepo = dataSource.getRepository(Role);
  const userRepo = dataSource.getRepository(Usuario);

  // 1️⃣ Criar roles ADMIN e USUARIO
  const rolesData = ['USUARIO', 'ADMIN'];
  const roles: Role[] = [];

  for (const name of rolesData) {
    let role = await roleRepo.findOne({ where: { name } });
    if (!role) {
      role = roleRepo.create({ name });
      await roleRepo.save(role);
      console.log(`Role ${name} criada`);
    } else {
      console.log(`Role ${name} já existe`);
    }
    roles.push(role);
  }

  // 2️⃣ Criar usuário root com role ADMIN
  const adminRole = roles.find(r => r.name === 'ADMIN');
  const rootEmail = 'root@example.com';
  let rootUser = await userRepo.findOne({ where: { email: rootEmail } });

  if (!rootUser) {
    const hashedPassword = await bcrypt.hash('root123', 10); // senha do root
    rootUser = userRepo.create({
      nome: 'Root',
      telefone: '11999999999',
      email: "rootEmail@hotmail.com",
      idade: 30,
      peso: 80,
      etnia: Etnia.BRANCA,
      role: adminRole,
    });
    await userRepo.save(rootUser);
    console.log('Usuário root criado com role ADMIN');
  } else {
    console.log('Usuário root já existe');
  }

  await dataSource.destroy();
}

seed().catch(err => console.error(err));