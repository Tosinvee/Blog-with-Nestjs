/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  imports:[TypeOrmModule.forFeature([Tag])],
  exports:[TagsService],
  providers: [TagsService]
})
export class TagsModule {}
