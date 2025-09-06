import { Bcrypt } from "src/auth/bcrypt/bcrypt";
import { Role } from "src/role/entities/role.entity";
import { userRole } from "src/usuario/dto/create-usuario.dto";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Etnia } from "src/usuario/enums/etnia.enum";
import { Repository } from "typeorm";

export async function initialSeed(roleRepository: Repository<Role>, usuarioRepository: Repository<Usuario>, bcrypt: Bcrypt) {

  const roles = [
    { id: userRole.USUARIO, nome: 'USUARIO' },
    { id: userRole.ADMIN, nome: 'ADMIN' },
  ];

  for (const roleData of roles) {
    const exists = await roleRepository.findOneBy({ id: roleData.id });
    if (!exists) {
      const role = roleRepository.create(roleData);
      await roleRepository.save(role);
      console.log(`Role ${role.nome} criada`);
    }
  }

  const adminEmail = 'admin@email.com';
  const exists = await usuarioRepository.findOne({
    where: {
      email: adminEmail
    }
  });

  if (!exists) {
    const role = await roleRepository.findOneBy({ id: userRole.ADMIN });
    if (!role)
      throw new Error('Role ADMIN não encontrada');

    const usuario = usuarioRepository.create({
      nome: 'admin',
      telefone: '0000000000',
      email: adminEmail,
      senha: await bcrypt.criptografarSenha('admin123'),
      idade: 30,
      peso: 70,
      etnia: Etnia.BRANCA,
      role: role
    });

    await usuarioRepository.save(usuario);
    console.log('Admin criado com sucesso');
  }
}
