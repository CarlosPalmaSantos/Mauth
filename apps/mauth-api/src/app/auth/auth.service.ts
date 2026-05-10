import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { AuthToken, hash, SignToken } from '@mauth/crypto'
import * as fs from 'fs'
import * as path from 'path'
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  // TODO: Agregar errores
  public async RegisterUser(reg: RegisterDto) {
    if (await this.isUserRegistered(reg.username)) {
      throw new BadRequestException('User already exist')
    }

    const user = this.userRepository.create({
      username: reg.username,
      email: reg.email,
      password: hash(reg.password)
    })

    await this.userRepository.save(user)

    return this.generateSignedToken(user.username)
  }

  public async LoginUser(log: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: log.username,
        password: hash(log.password)
      }
    })

    return this.generateSignedToken(user.username)
  }

  private async isUserRegistered(username: string) {
    // TODO: Verificar el corrrecto funcionamiento
    const res = await this.userRepository.exists({
      where: {
        username
      }
    })

    return res
  }

  private generateSignedToken(username: string): string {
    const token: AuthToken = {
      author: 'MAUTH-API', // TODO: Utilizar variables de entorno
      expire: Date.now() + 50000, // TODO: Utilizar variables de entorno
      userId: username,
    }

    const privateToken = this.getPrivateToken()

    return SignToken(token, privateToken)

    // TODO: Agregar posibilidad de comprobación
  }

  private getPrivateToken(): string {
    const privateKeyPath = path.join(__dirname, '../../../certs/private.pem') // TODO: Utilizar variables de entorno

    // TODO: Verificar si la clave existe y si no soltar un error
    return fs.readFileSync(privateKeyPath, 'utf8')
  }

}
