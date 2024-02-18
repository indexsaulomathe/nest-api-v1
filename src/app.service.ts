import { Injectable } from '@nestjs/common';
import { getWelcomeMessage } from './welcome/welcome';

export interface StatusObject {
  status: 'online' | 'offline' | 'error';
  service: string;
}

@Injectable()
export class AppService {
  getWelcomeMessage(statusObjects: StatusObject[]): string {
    return getWelcomeMessage(statusObjects);
  }
}
