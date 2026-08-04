import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ResponseInterceptor } from "./common/interceptor/ResponseInterceptor";
import { ExceptionsFilter } from "./common/exception/ExceptionsFilter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);

    res.on("finish", () => {
      console.log(`[RESPONSE] ${res.statusCode}`);
    });

    next();
  });

  app.use(cookieParser());

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());
  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: process.env.API_CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  });

  const port = Number(process.env.API_PORT ?? 8080);
  await app.listen(port);
}

void bootstrap();
