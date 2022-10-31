import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Post, PostInput } from './post.model';
import { PostService } from './post.service';
import { User } from '../users/user.model';

@Resolver((_of: any) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query((_returns) => [Post], { name: 'posts', nullable: true })
  async getPosts() {
    return this.postService.findAll();
  }

  @Query((_returns) => Post, { name: 'post', nullable: true })
  async getPostById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.postService.findById(id);
  }

  @Mutation(() => Post, { name: 'createPost' })
  async createPost(@Args('data') input: PostInput): Promise<Post> {
    return this.postService.createPost(input);
  }

  @Mutation((_returns) => Post, { nullable: true })
  async removePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
    return this.postService.removePost(postId);
  }

  @ResolveField('user', (_returns) => User, { nullable: true })
  async getUser(@Parent() post: Post) {
    return await post.user;
  }
}
