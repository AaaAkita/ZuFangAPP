import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

console.log('Testing PrismaClient Initialization...');

try {
    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });
    console.log('Successfully initialized!');
    prisma.$disconnect();
} catch (error) {
    console.error('Initialization failed:', error);
}
