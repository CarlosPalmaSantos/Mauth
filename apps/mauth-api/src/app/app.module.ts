import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_URL = process.env.DB_URL

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: DB_URL,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    entities: [User]
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, 'mauth-portal'),
    exclude: ['/api'], // No redirigir si la ruta empieza por /api
  }),
    AuthModule],
})
export class AppModule { }
