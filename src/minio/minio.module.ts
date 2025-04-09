import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importe o ConfigModule
import { MinioService } from './minio.service';

@Module({
  imports: [ConfigModule.forRoot()], // Adicione isso
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule {}