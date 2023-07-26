import fs from 'fs-extra';
import { Args } from './cli';

export type Plugin = {
  name: string,
  file: string,
}

export type PluginsConfig = {
  prefix: string,
  plugins: Plugin[],
}

const plugins: PluginsConfig = {
  prefix: './plugins/generate/',
  plugins: [
    {
      name: 'supabase',
      file: 'supabase.js',
    },
    {
      name: 'react-material',
      file: 'react-material.js',
    },
  ],
};

export const listGeneratePlugins = (): Plugin[] => {
  return plugins.plugins;
}

export const listGenerators = (): string[] => {
  return plugins.plugins.map(el => el.name);
}

export const generate = async (args: Args) => {
  const configPath = args.config;
  const config = fs.readJsonSync(configPath);

  const generators = [
    config.frontend,
    config.backend,
  ];

  if (!generators || !generators.length) {
    console.error('Generators is missing from config!');
    return;
  }

  if (!fs.existsSync(args.output)) {
    fs.mkdirSync(args.output);
  }

  for (const el of generators) {
    const plugin = plugins.plugins.find(e => e.name === el);
    if (!plugin) {
      console.error(`Generator ${el} don't exists!`);
      return;
    }
    const pluginPath = plugins.prefix + plugin.file;
    const { exec } = await import(pluginPath);

    await exec(args, config);
  }
}
