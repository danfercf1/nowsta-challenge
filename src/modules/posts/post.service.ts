import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Post, PostInput } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find({
      relations: ['user'],
    });
  }

  findById(id: number) {
    return this.postRepository.findOne(
      { id },
      {
        relations: ['user'],
      },
    );
  }

  findByIds(ids: number[]) {
    return this.postRepository.find({
      where: { id: In(ids) },
      relations: ['user'],
    });
  }

  createPost(data: PostInput) {
    const post = this.postRepository.create(data);
    return this.postRepository.save(post);
  }

  async removePost(postId: number) {
    const post = await this.findById(postId);

    if (post) {
      const res = await this.postRepository.remove(post);
      res.id = postId;
      return res;
    }

    return null;
  }
}
