import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../../src/modules/posts/post.model';
import { PostService } from '../../src/modules/posts/post.service';
import { User } from '../../src/modules/users/user.model';

type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

describe('PostService', () => {
  let service: PostService;
  const postRepositoryMock: MockType<Repository<Post>> = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const promiseUserMock: MockType<Promise<User>> = {
    then: jest.fn(),
    catch: jest.fn(),
    finally: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: postRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const postDTO = {
        title: 'Post Title',
        slug: 'post-title',
        description: 'Post description',
        content: 'This is a post content',
      };

      postRepositoryMock.save.mockReturnValue(postDTO);
      postRepositoryMock.create.mockReturnValue(postDTO);
      const newCustomer = await service.createPost(postDTO);
      expect(newCustomer).toMatchObject(postDTO);
      expect(postRepositoryMock.save).toHaveBeenCalledWith(postDTO);
    });
  });

  describe('findAll', () => {
    it('should find all posts', async () => {
      const fakeDate = '2022-10-31T00:41:21.005Z';
      const date = new Date(fakeDate);
      const fakeUser = {} as Promise<User>;
      const posts = [
        {
          id: 1,
          title: 'Post Title',
          slug: 'post-title',
          description: 'Post description',
          content: 'This is a post content',
          status: 'active',
          user: {},
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
          title: 'Post Title 2',
          slug: 'post-title-2',
          description: 'Post description 2',
          content: 'This is a post content 2',
          status: 'active',
          user: {},
          createdAt: date,
          updatedAt: date,
        },
      ];
      postRepositoryMock.find.mockReturnValue(posts);
      const foundPosts = await service.findAll();
      expect(foundPosts).toHaveLength(2);
      expect(foundPosts).toContainEqual({
        id: 1,
        title: 'Post Title',
        slug: 'post-title',
        description: 'Post description',
        content: 'This is a post content',
        status: 'active',
        createdAt: date,
        updatedAt: date,
        user: fakeUser,
      });
      expect(postRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find a post', async () => {
      const fakeDate = '2022-10-31T00:41:21.005Z';
      const date = new Date(fakeDate);
      const post = {
        id: 1,
        title: 'Post Title',
        slug: 'post-title',
        description: 'Post description',
        content: 'This is a post content',
        status: 'active',
        user: {},
        createdAt: date,
        updatedAt: date,
      };
      postRepositoryMock.findOne.mockReturnValue(post);
      const foundPost = await service.findById(post.id);
      expect(foundPost).toMatchObject(post);
      expect(postRepositoryMock.findOne).toHaveBeenCalledWith(
        { id: post.id },
        {
          relations: ['user'],
        },
      );
    });
  });
});
