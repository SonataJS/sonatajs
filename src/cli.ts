import figlet from 'figlet';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const parseArguments = (rawArgs: string[]) => {
  const args = yargs(hideBin(rawArgs))
    .usage('Usage: sonata <command> [options]').alias('h', 'help')
    .version().alias('v', 'version')
    .epilog(`Copyright (c) 2023 - ${new Date().getFullYear()} Milos Zivlak`)
    .command('init [options]', 'Init config file', (yargs) => {
      return yargs
        .option('config', {
          alias: 'c',
          type: 'string',
          description: 'Config file',
          default: 'sonata.json',
        });
    })
    .command('generate [options]', 'Generate projects and files', (yargs) => {
      return yargs
        .option('config', {
          alias: 'c',
          type: 'string',
          description: 'Config file',
          default: 'sonata.json',
        })
        .option('output', {
          alias: 'o',
          type: 'string',
          description: 'Output folder',
          default: './',
        });
    })
    .parse();

  return args;
}

export const cli = async (rawArgs: string[]) => {
  console.log(figlet.textSync('SonataJS'));
  const args = parseArguments(rawArgs);

  console.log(args);
}
