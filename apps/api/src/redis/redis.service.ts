import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "redis";

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);

  private readonly client: ReturnType<typeof createClient>;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>("REDIS_HOST") ?? "localhost";
    const port = Number(this.configService.get<string>("REDIS_PORT") ?? "6379");

    this.client = createClient({
      socket: {
        host,
        port,
      },
    });

    this.client.on("error", (error) => {
      this.logger.error("Redis 연결 오류", error instanceof Error ? error.stack : String(error));
    });
  }

  async onModuleInit(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }

    const result = await this.client.ping();

    this.logger.log(`Redis 연결 성공: ${result}`);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds !== undefined) {
      await this.client.set(key, value, {
        EX: ttlSeconds,
      });

      return;
    }

    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
