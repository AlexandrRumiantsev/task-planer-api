import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  handleRequest(err, user, info) {

    if (err || !user || info?.message) {
      let errorMessage = '';
      if (err) {
        errorMessage = err.message || 'Ошибка авторизации.';
      } else if (info?.message) {
        errorMessage = info.message || 'Токен отсутствует или недействителен.';
      }
      
      throw new ForbiddenException(errorMessage);
    }
    return user;
  }
}
