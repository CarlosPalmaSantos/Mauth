import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from './entities/user';
import { AuthToken, SignToken } from '@mauth/crypto'
import * as fs from 'fs'
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  // TODO: Agregar errores
  public async RegisterUser(username: string) {
    if (this.isUserRegistered(username))
      console.error('Ya existe perros')

    const user = this.userRepository.create({
      username,
      email: 'test'
    })

    await this.userRepository.save(user)

    return this.generateSignedToken(username)
  }

  private async isUserRegistered(username: string) {
    return await this.userRepository.exists({
      where: {
        username
      }
    })
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
    const privateKeyPath = '../../certs' // TODO: Utilizar variables de entorno
    // TODO: Verificar si la clave existe y si no soltar un error
    return fs.readFileSync(privateKeyPath, 'utf8')
  }

}
