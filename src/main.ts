import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));

    console.log('Генерация спецификации OpenAPI...');
    try {
        const config = new DocumentBuilder()
            .setTitle('NEAT API')
            .setDescription('API документация проекта NEAT')
            .setVersion('1.0')
            .build();

        const documentForFile = SwaggerModule.createDocument(app, config);
        const outputFilePath = path.join(__dirname, '..', 'api-openapi.json');
        fs.writeFileSync(outputFilePath, JSON.stringify(documentForFile, null, 2));
        console.log(`✅ УСПЕХ: Файл спецификации api-openapi.json создан.`);

    } catch (error) {
        console.error("❌ Ошибка:", error.message);
    }

    const adapter = app.getHttpAdapter();
    
    if (adapter && typeof adapter.use === 'function') {
      const express = require('express'); 
      
      adapter.use(express.static(path.join(__dirname, '..')));
      console.log('📂 Статические файлы подключены.');
    } else {
      console.warn('⚠️ Не удалось подключить статику: адаптер недоступен.');
    }
    const uiConfig = new DocumentBuilder().build();
    SwaggerModule.setup('api', app, () =>
      SwaggerModule.createDocument(app, uiConfig),
    );

    await app.listen(3000);
    console.log('🚀 Сервер запущен на порту 3000');
}

bootstrap();