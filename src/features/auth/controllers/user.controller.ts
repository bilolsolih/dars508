import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from '../dtos/user/user.register.dto';
import { UserService } from '../services/user.service';
import { UserLoginDto } from '../dtos/user/user.login.dto';

// DI - Dependency Injection

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {
  }

  @Post('register')
  async register(@Body() payload: UserRegisterDto) {
    return await this.service.register(payload);
  }

  @Post('login')
  async login(@Body() payload: UserLoginDto){
    return await this.service.login(payload);
  }
}

// JWT - JSON Web Token