import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService implements OnModuleInit {
  private client: Client;
  private bucketName = this.configService.get('MINIO_BUCKET_NAME', 'trees');

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = new Client({
      endPoint: this.configService.get('MINIO_ENDPOINT', 'localhost'),
      port: parseInt(this.configService.get('MINIO_PORT', '9000')),
      useSSL: this.configService.get('MINIO_USE_SSL', 'false') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY', 'admin'),
      secretKey: this.configService.get('MINIO_SECRET_KEY', 'password'),
    });

    // Criar bucket se não existir
    const exists = await this.client.bucketExists(this.bucketName);
    if (!exists) {
      await this.client.makeBucket(this.bucketName);
    }
  }

  async uploadFile(file: Express.Multer.File, treeId: string): Promise<string> {
    const fileName = `${treeId}/${file.originalname}`;
    await this.client.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype },
    );
    return fileName;
  }

  async getFileUrl(fileName: string): Promise<string> {
    return await this.client.presignedGetObject(this.bucketName, fileName);
  }
  
  async deleteFile(fileName: string): Promise<void> {
    await this.client.removeObject(this.bucketName, fileName);
  }
} 