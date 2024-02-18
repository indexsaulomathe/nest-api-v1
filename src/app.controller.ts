import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import * as NodeCache from 'node-cache';

enum ApiStatus {
  Online = 'online',
  Offline = 'offline',
  Error = 'error',
}

interface StatusObject {
  status: ApiStatus;
  service: string;
}

const cache = new NodeCache({ stdTTL: 86400 });
const CACHE_TTL = 86400;

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
    const shouldRunTests = await this.areTestsToBeRunToday();

    let databaseStatusPromise;
    let testsStatusPromise;

    if (shouldRunTests) {
      databaseStatusPromise = this.checkDatabaseConnection();
      testsStatusPromise = this.runTests();

      // Armazenando o status dos testes e a conectividade do banco de dados na cache
      const [databaseStatus, testsStatus] = await Promise.all([
        databaseStatusPromise,
        testsStatusPromise,
      ]);
      cache.set('Database', databaseStatus);
      cache.set('Tests', testsStatus);
      cache.set('testsLastRun', new Date(), CACHE_TTL);
    } else {
      // Recuperando o status dos testes e a conectividade do banco de dados da cache
      databaseStatusPromise = Promise.resolve(cache.get('Database'));
      testsStatusPromise = Promise.resolve(cache.get('Tests'));
    }

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

  private async areTestsToBeRunToday(): Promise<boolean> {
    const testsLastRun: Date | undefined = cache.get('testsLastRun');

    if (testsLastRun === undefined) {
      return true;
    }

    const today = new Date();
    const lastRunDate = new Date(testsLastRun);

    return today.getDate() !== lastRunDate.getDate();
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
