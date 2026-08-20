import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ResponseInterceptor } from "./common/interceptor/ResponseInterceptor";
import { ExceptionsFilter } from "./common/exception/ExceptionsFilter";
import cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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

  const config = new DocumentBuilder()
    .setTitle("RedRope API")
    .setDescription("RedRope 서비스의 REST API 문서")
    .setVersion("1.0.0")
    .addTag("Auth API", "인증 API")
    .addTag("User API", "사용자 API")
    .addTag("World API", "월드 API")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "access-token",
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  const port = Number(process.env.API_PORT ?? 8080);
  await app.listen(port);
}

void bootstrap();
