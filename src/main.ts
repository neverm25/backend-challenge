import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const port = process.env.NESTJS_APP_PORT;

  const app = await NestFactory.create(AppModule);
  await app.listen(port).then(() => {
    console.log(`Server started at http://localhost:${port}`);
  });

  // This is necessary to make the hot-reload work with Docker
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
