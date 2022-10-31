import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { PostService } from '../posts/post.service';
import { User, UserInput } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ['posts'],
    });
  }

  findById(id: number) {
    return this.userRepository.findOne(
      { id },
      {
        relations: ['posts'],
      },
    );
  }

  async createUser(data: UserInput) {
    const user = await this.userRepository.save(
      this.userRepository.create(data),
    );
    return user;
  }

  findByIds(ids: number[]) {
    return this.userRepository.find({
      where: { id: In(ids) },
      relations: ['posts'],
    });
  }
}
