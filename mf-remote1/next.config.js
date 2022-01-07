const {
  withModuleFederation,
  MergeRuntime,
} = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack(config, options) {
    const mfConf = {
      mergeRuntime: true,
      name: 'remote1',
      library: { type: config.output.libraryTarget, name: 'remote1' },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {},
      exposes: {
        './Remote1': './components/Remote1',
        './Remote11': './components/Remote11',
      },
      shared: [],
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
