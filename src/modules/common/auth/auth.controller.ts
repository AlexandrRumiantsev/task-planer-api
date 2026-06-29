import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBody, ApiParam, ApiResponse, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';

// Класс DTO для тела запроса
class LoginDto {
  @ApiProperty({ example: 'example_user', description: 'Имя пользователя' })
  username: string;

  @ApiProperty({ example: 'secure_password', description: 'Пароль пользователя' })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({ type: LoginDto, description: 'Форма для входа' })
  @ApiResponse({ status: 200, description: 'Успешная авторизация.' })
  @ApiResponse({ status: 401, description: 'Некорректные учётные данные.' })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    return { access_token: this.authService.generateToken(user.id) };
  }

  @Get('/me')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Получение профиля текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно авторизован.', schema: { type: 'object', properties: { id: { type: 'number' }, username: { type: 'string' } }}})
  @ApiResponse({ status: 401, description: 'Требуется авторизация.' })
  getProfile(@Request() req) {
    return req.user;
  }
}