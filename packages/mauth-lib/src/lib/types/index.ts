export * from './dto/login.dto'
export * from './dto/register.dto'
export * from './dto/user.dto'

export const ERRORS = {
  AUTH: {
    LOGIN: {
      INVALID_CREDENTIALS: 'AUTH_LOGIN_INVALID_CREDENTIALS',
    },
    VALIDATE: {
      INVALID_TOKEN: 'AUTH_VALIDATE_INVALID_TOKEN',
      INVALID_USER: 'AUTH_VALIDATE_INVALID_USER',
    }
  }
}

