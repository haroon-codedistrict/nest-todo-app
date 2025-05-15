import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './utils/helpers/common.helper';

const appPort = env('APP_PORT', 4000);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(appPort);
}

bootstrap()
    .then(() => console.log(`Server is running on port ${appPort}`))
    .catch((error) => console.error('Error starting the server:', error));
