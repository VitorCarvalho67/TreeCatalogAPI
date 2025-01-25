import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const user = this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
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
}
