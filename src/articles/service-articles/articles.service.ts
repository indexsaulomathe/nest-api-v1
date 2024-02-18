import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    const { title, description, content, published, schoolId, userId } =
      createArticleDto;

    const data: Article = {
      title,
      description,
      content,
      published,
      schoolId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: published ? new Date() : null,
      id: 0,
    };

    return this.prisma.article.create({ data });
  }

  findDrafts(): Promise<Article[]> {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  findAll(): Promise<Article[]> {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findOne(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number): Promise<Article> {
    return this.prisma.article.delete({ where: { id } });
  }
}
