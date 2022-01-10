/** @type {import('next').NextConfig} */
const {
  withModuleFederation,
  MergeRuntime,
} = require('@module-federation/nextjs-mf');
const path = require('path');
const deps = require('./package.json').dependencies;

const ssrRemoteEntry =
  process.env.NODE_ENV === 'production'
    ? path.resolve(
        __dirname,
        '../header/.next/server/static/runtime/remoteEntry.js',
      )
    : path.resolve(
        __dirname,
        '../header/.next/server/static/runtime/remoteEntry.js',
      );

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack(config, options) {
    const { isServer } = options;
    const mfConf = {
      mergeRuntime: true,
      name: 'host',
      library: { type: config.output.libraryTarget, name: 'host' },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {
        header: isServer ? ssrRemoteEntry : 'header', // for client, treat it as a global
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': {
          singleton: true,
          eager: true,
        },
      },
    };

    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!options.isServer) {
      config.output.publicPath = 'http://localhost:4000/_next/';
    }

    return config;
  },
};
