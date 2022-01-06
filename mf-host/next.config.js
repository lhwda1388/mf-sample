/** @type {import('next').NextConfig} */
const { withFederatedSidecar } = require('@module-federation/nextjs-mf');

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer, webpack } = options;

    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });

    if (isServer) {
      // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
      Object.assign(config.resolve.alias, {
        host: false,
        remote1: false,
      });
    } else {
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          name: 'host',
          remoteType: 'var',
          remotes: {
            remote1: 'remote1@http://localhost:4010/remoteEntry.js',
          },
          shared: {
            '@module-federation/nextjs-mf/lib/noop': {
              eager: false,
            },
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false,
            },
          },
        }),
      );
    }
    return config;
  },
};
