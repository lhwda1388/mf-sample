/** @type {import('next').NextConfig} */
const {
  withModuleFederation,
  MergeRuntime,
} = require('@module-federation/nextjs-mf');
const path = require('path');
const deps = require('./package.json').dependencies;

const ssrRemoteEntry =
  process.env.NODE_ENV === 'production'
    ? path.join(
        '<remotes-path>/mf-remote1/.next/server/chunks/static/runtime/remoteEntry.js',
      )
    : path.resolve(
        __dirname,
        '../mf-remote1/.next/server/static/runtime/remoteEntry.js',
      );

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack(config, options) {
    const { isServer, webpack } = options;
    console.log(ssrRemoteEntry);
    const mfConf = {
      mergeRuntime: true,
      name: 'host',
      library: { type: config.output.libraryTarget, name: 'host' },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {
        remote1: isServer ? ssrRemoteEntry : 'remote1', // for client, treat it as a global
      },
      shared: [],
    };

    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!options.isServer) {
      config.output.publicPath = 'http://localhost:4000/_next/';
    }

    return config;
  },
};
