import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';
import { Response } from 'express';

@Controller('api')
export class SwaggerController {
  
  @Get()
  getSwaggerUi(@Res() res: Response) {
    const filePath = path.join(__dirname, '..', 'node_modules', 'swagger-ui-dist', 'index.html');
    
    return res.sendFile(filePath);
  }
}