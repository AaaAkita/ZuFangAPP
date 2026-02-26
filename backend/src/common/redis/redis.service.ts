import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private redisClient: Redis;
    private readonly logger = new Logger(RedisService.name);

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        const host = this.configService.get<string>('REDIS_HOST', 'localhost');
        const port = this.configService.get<number>('REDIS_PORT', 6379);
        const password = this.configService.get<string>('REDIS_PASSWORD', '');
        const db = this.configService.get<number>('REDIS_DB', 0);

        const redisOptions: any = {
            host,
            port,
            db,
        };
        if (password) {
            redisOptions.password = password;
        }

        this.redisClient = new Redis(redisOptions);

        this.redisClient.on('connect', () => this.logger.log('Redis connected success'));
        this.redisClient.on('error', (err) => this.logger.error('Redis connection error', err));
    }

    onModuleDestroy() {
        this.redisClient.disconnect();
    }

    getClient(): Redis {
        return this.redisClient;
    }
}
