import {
  Int,
  Args,
  Parent,
  Query,
  Mutation,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { User, UserInput } from './user.model';

import { UserService } from './user.service';
import { PostService } from '../posts/post.service';
import { forwardRef, Inject } from '@nestjs/common';
import { Post } from '../posts/post.model';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => PostService))
    private readonly teamService: PostService,
  ) {}

  @Query((returns) => [User], { name: 'users', nullable: false })
  async getUsers() {
    return this.userService.findAll();
  }

  @Query((returns) => User, { name: 'user', nullable: true })
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') input: UserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @ResolveField('posts', () => [Post], { nullable: false })
  async getPosts(@Parent() user: User) {
    return await user.posts;
  }
}
