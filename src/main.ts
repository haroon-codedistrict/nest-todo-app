import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
        origin: true, // You can replace this with specific origins like 'http://localhost:3000'
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
    .then(() => {
        console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
    })
    .catch((error) => {
        console.error('Error starting the server:', error);
    });
