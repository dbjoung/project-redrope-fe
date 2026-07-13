import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.API_CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  });

  const port = Number(process.env.API_PORT ?? 8080);
  await app.listen(port);
}

void bootstrap();
