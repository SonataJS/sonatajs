import figlet from 'figlet';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const parseArguments = (rawArgs: string[]) => {
  const args = yargs(hideBin(rawArgs))
    .usage('Usage: projizi <command> [options]')
    .version().alias('v', 'version')
    .epilog(`Copyright (c) 2023 - ${new Date().getFullYear()} Milos Zivlak`)
    .parse();

  return args;
}

export const cli = async (rawArgs: string[]) => {
  console.log(figlet.textSync('SonataJS'));
  const args = parseArguments(rawArgs);
}
