import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.model';
import { PostResolver } from './post.resolver';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UserModule)],
  providers: [PostService, PostResolver],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
