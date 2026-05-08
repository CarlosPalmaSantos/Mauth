#!/usr/bin/env node

import * as  fs from 'fs'
import * as paths from 'path'

import { Command } from 'commander'
import { readStdin, generateKeys, GenerateToken, SignToken, ValidateToken } from '@mauth/crypto'
import chalk from 'chalk'

const program = new Command()

program
  .name('mauth')
  .description('Mauth terminal client')
  .version('0.1.0')

program.command('key')
  .command('genenerate').alias('gen').alias('g')
  .description('Generate a new key')
  .option('-p, --path <path>', 'Path to generate the key', paths.join(process.cwd(), 'certs'))
  .action(({ path }) => {
    const fullPath = paths.resolve(path)

    if (!fs.existsSync(fullPath)) {
      console.warn(chalk.cyan(`Making dir ${fullPath}...`))
      fs.mkdirSync(fullPath, { recursive: true })
    }

    if (fs.statSync(fullPath).isFile()) {
      console.error(`${fullPath} is not a directory`)
      return
    }

    const publicPath = paths.join(fullPath, 'public.pem')
    const privatePath = paths.join(fullPath, 'private.pem')

    const { publicKey, privateKey } = generateKeys()

    fs.writeFileSync(publicPath, publicKey, 'utf8')
    fs.writeFileSync(privatePath, privateKey, 'utf8')

    console.warn(chalk.cyan(`Keys generated ${fullPath}...`))
  })

const tokenCommand = program.command('token')

tokenCommand
  .command('generate').alias('gen').alias('g')
  .description('Generate a Mauth Token')
  .argument('<user>', 'User identification')
  .option('-a, --author <author>', 'Author key', 'MAUTH-CLI')
  .option('-o, --offset <offset>', 'Time offset', '500000')
  .option('-s, --signed', 'Return signed token')
  .option('-p, --path <path>', 'Path to the key', paths.join(process.cwd(), 'certs'))
  .action((user, { author, offset, signed, path }) => {
    const fullPath = paths.resolve(path)

    if (!fs.existsSync(fullPath)) {
      console.error(chalk.red(`Not directory ${fullPath}`))
      return
    }

    if (!user) {
      console.log('not user provided')
      return
    }

    const token = GenerateToken(author, user, Number(offset))
    if (!signed)
      console.log(token)
    else {
      const privatePath = paths.join(fullPath, 'private.pem')
      if (!fs.existsSync(privatePath)) {
        console.error(chalk.red(`Not file ${privatePath}`))
        return
      }
      const privateKey = fs.readFileSync(privatePath, 'utf8')
      console.log(SignToken(token, privateKey))
    }
  })

tokenCommand
  .command('validate').alias('val').alias('v')
  .description('Validate a Mauth Token')
  .argument('[token]', 'Token to validate')
  .option('-p, --path <path>', 'Path to the key', paths.join(process.cwd(), 'certs'))
  .action(async (token, { path }) => {
    const fullPath = paths.resolve(path)

    const pipeData = await readStdin()

    const finalToken = pipeData || token

    const publicPath = paths.join(fullPath, 'public.pem')
    if (!fs.existsSync(publicPath)) {
      console.error(chalk.red(`Not file ${publicPath}`))
      return
    }

    const publicToken = fs.readFileSync(publicPath, 'utf8')

    const res = ValidateToken(finalToken, publicToken)

    if (!res) {
      console.error(chalk.red('Token is invalid!'))
      return
    }

    console.log(chalk.green(`Token is valid:`))
    console.log(res)
  })


program.parse(process.argv)
