import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TreeService } from './tree.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTreeDto: CreateTreeDto, @Request() req) {
    return this.treeService.create({
      ...createTreeDto,
      userId: req.user.userId,
    });
  }

  @Get()
  findAll() {
    return this.treeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTreeDto: UpdateTreeDto) {
    return this.treeService.update(id, updateTreeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treeService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.treeService.uploadImage(id, file);
  }

  @Get(':id/image')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    try {
      const url = await this.treeService.getImageUrl(id);
      return res.redirect(url);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}