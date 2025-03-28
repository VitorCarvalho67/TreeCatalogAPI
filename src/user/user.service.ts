import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    if (!hashedPassword) {
      throw new Error('Erro ao criptografar a senha');
    }

    const user = this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    return user;
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {id}
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.prismaService.user.update({
      where: {id},
      data: {
        email: updateUserDto.email,
        password: updateUserDto.password,
      },
    });

    return user;
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {id}
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email }
    });
  }
}
