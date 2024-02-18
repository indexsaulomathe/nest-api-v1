import { Article } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolEntity } from 'src/schools/entities/school.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class ArticleEntity implements Article {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  content: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  publishedAt: Date | null;

  @ApiProperty()
  schoolId: number;

  @ApiProperty({ type: SchoolEntity })
  school: SchoolEntity;

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  constructor({ user, ...data }: Partial<ArticleEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
