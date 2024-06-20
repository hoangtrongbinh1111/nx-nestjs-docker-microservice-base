import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenService {
  validateUser(username: string, password: string): boolean {
    // Simplified validation logic (replace with actual authentication logic)
    return username === 'admin' && password === 'admin';
  }
}
