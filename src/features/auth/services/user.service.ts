import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRegisterDto} from '../dtos/user/user.register.dto';
import {User} from '../entities/user.entity';
import argon2 from 'argon2';
import {UserLoginDto} from '../dtos/user/user.login.dto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {
  }

  async register(payload: UserRegisterDto) {
    const alreadyExists = await User.existsBy({login: payload.login});
    if (alreadyExists)
      throw new BadRequestException({status: 400, message: 'Login already taken'});

    const newUser = payload as User;
    newUser.password = await argon2.hash(payload.password);
    await User.save(newUser);
    return newUser;
  }

  async login(payload: UserLoginDto) {
    const user = await User.findOneBy({login: payload.login});
    if (!user)
      throw new UnauthorizedException();

    const passwordsMatch = await argon2.verify(user.password, payload.password);
    if (!passwordsMatch)
      throw new UnauthorizedException();

    const jwtPayload = {
      id: user.id,
      role: user.role,
    };

    const accessKey = this.jwtService.sign(jwtPayload);

    return {accessToken: accessKey};
  }
}