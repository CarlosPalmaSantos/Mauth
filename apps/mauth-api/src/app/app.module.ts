import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities';

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
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
