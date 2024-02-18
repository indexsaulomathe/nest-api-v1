import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SchoolsModule } from './schools/schools.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PrismaModule,
    ArticlesModule,
    UsersModule,
    AuthModule,
    SchoolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
