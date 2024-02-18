import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';

enum ApiStatus {
  Online = 'online',
  Offline = 'offline',
  Error = 'error',
}

interface StatusObject {
  status: ApiStatus;
  service: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const statusObjects: StatusObject[] = await this.getStatusObjects();
    const welcomeMessage = this.appService.getWelcomeMessage(statusObjects);
    return welcomeMessage;
  }

  private async getStatusObjects(): Promise<StatusObject[]> {
    const databaseStatusPromise = this.checkDatabaseConnection();
    const testsStatusPromise = this.runTests();

    try {
      const [databaseStatus, testsStatus] = await Promise.all([
        databaseStatusPromise,
        testsStatusPromise,
      ]);
      return [
        { status: databaseStatus, service: 'Database' },
        { status: testsStatus, service: 'Tests' },
      ];
    } catch (error) {
      console.error('Error getting status:', error);
      return [];
    }
  }

  private async checkDatabaseConnection(): Promise<ApiStatus> {
    const prisma = new PrismaClient();

    try {
      await prisma.$connect();
      return ApiStatus.Online;
    } catch (error) {
      console.error('Error connecting to the database:', error);
      return ApiStatus.Error;
    } finally {
      await prisma.$disconnect();
    }
  }

  private async runTests(): Promise<ApiStatus> {
    return new Promise((resolve) => {
      exec('npm test', { timeout: 30000 }, (error, stdout, stderr) => {
        if (error || stderr) {
          console.error('Error executing tests:', error || stderr);
          resolve(ApiStatus.Error);
        } else {
          console.log('Tests output:', stdout);
          if (stdout.includes('FAIL')) {
            console.error('Some tests failed');
            resolve(ApiStatus.Error);
          } else {
            console.log('All tests passed successfully');
            resolve(ApiStatus.Online);
          }
        }
      });
    });
  }
}
