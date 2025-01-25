import { Injectable } from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TreeService {
  constructor(private prismaService: PrismaService) {}

  create(createTreeDto: CreateTreeDto) {
    const tree = this.prismaService.tree.create({
      data: {
        tag: createTreeDto.tag,
        specie: createTreeDto.specie,
        age: createTreeDto.age,
        height: createTreeDto.height,
      },
    });

    return tree;
  }

  findAll() {
    return this.prismaService.tree.findMany();
  }

  findOne(id: string) {
    return this.prismaService.tree.findUnique({
      where: {id}
    });
  }

  update(id: string, updateTreeDto: UpdateTreeDto) {
    const tree = this.prismaService.tree.update({
      where: {id},
      data: {
        tag: updateTreeDto.tag,
        specie: updateTreeDto.specie,
        age: updateTreeDto.age,
        height: updateTreeDto.height,
      },
    });

    return tree;
  }

  remove(id: string) {
    return this.prismaService.tree.delete({
      where: {id}
    });
  }
}
