const {
  withModuleFederation,
  MergeRuntime,
} = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack(config, options) {
    const mfConf = {
      mergeRuntime: true,
      name: 'header',
      library: { type: config.output.libraryTarget, name: 'header' },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {},
      exposes: {
        './Header': './components/Header',
      },
      shared: {
        'styled-components': {
          singleton: true,
        },
        react: { singleton: true },
        'react-dom': {
          singleton: true,
        },
      },
    };
    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!options.isServer) {
      config.output.publicPath = 'http://localhost:4010/_next/';
    }

    return config;
  },
};
