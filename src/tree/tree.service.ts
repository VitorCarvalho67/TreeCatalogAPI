import { Injectable } from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class TreeService {
  constructor(
    private prismaService: PrismaService,
    private minioService: MinioService,
  ) {}

  create(createTreeDto: CreateTreeDto) {
    const tree = this.prismaService.tree.create({
      data: {
        tag: createTreeDto.tag,
        specie: createTreeDto.specie,
        age: createTreeDto.age,
        height: createTreeDto.height,
        userId: createTreeDto.userId,
      },
    });

    return tree;
  }

  findAll() {
    return this.prismaService.tree.findMany();
  }

  findOne(id: string) {
    return this.prismaService.tree.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTreeDto: UpdateTreeDto) {
    const tree = this.prismaService.tree.update({
      where: { id },
      data: {
        tag: updateTreeDto.tag,
        specie: updateTreeDto.specie,
        age: updateTreeDto.age,
        height: updateTreeDto.height,
        imageUrl: updateTreeDto.imageUrl, // Adicionado suporte para imageUrl
      },
    });

    return tree;
  }

  remove(id: string) {
    return this.prismaService.tree.delete({
      where: { id },
    });
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    const tree = await this.findOne(id);
    if (!tree) {
      throw new Error('Árvore não encontrada');
    }
    const fileName = await this.minioService.uploadFile(file, id);
    const imageUrl = await this.minioService.getFileUrl(fileName);
    return this.update(id, { imageUrl });
  }

  async getImageUrl(id: string): Promise<string> {
    const tree = await this.findOne(id);
    
    if (!tree) {
      throw new Error('Árvore não encontrada');
    }
    if (!tree.imageUrl) {
      throw new Error('Imagem não encontrada');
    }
    return this.minioService.getFileUrl(tree.imageUrl);
  }
}