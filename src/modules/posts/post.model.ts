import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../users/user.model';

@Entity('posts')
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  title: string;

  @Column()
  @Field({ nullable: false })
  slug: string;

  @Column()
  @Field({ nullable: false })
  description: string;

  @Column()
  @Field({ nullable: false })
  content: string;

  @Column()
  @Field({ nullable: false })
  status: string;

  @ManyToOne(() => User, (user: { posts: any }) => user.posts)
  @JoinTable()
  @Field((type) => User, { nullable: true })
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class PostInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  slug: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  content: string;

  @Field(() => Int, { nullable: true })
  user?: Promise<User>;

  @Field({ nullable: true, defaultValue: 'active' })
  status?: string;
}
