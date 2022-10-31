import {
  Body,
  Catch,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { PostInput } from './post.model';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    const posts = await this.postService.findAll();

    return { posts };
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    const post = await this.postService.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return { post };
  }

  @Post()
  async createPost(@Body() data: PostInput) {
    const post = await this.postService.createPost(data);
    return { post };
  }
}
