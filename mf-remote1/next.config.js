const { withFederatedSidecar } = require('@module-federation/nextjs-mf');
/** @type {import('next').NextConfig} */
// module.exports = withFederatedSidecar(
//   {
//     name: 'remote1',
//     filename: 'static/runtime/remoteEntry.js',
//     exposes: {
//       './Remote1': './components/Remote1',
//       './Remote11': './components/Remote11',
//     },
//     shared: {
//       react: {
//         // Notice shared are NOT eager here.
//         requiredVersion: false,
//         singleton: true,
//       },
//     },
//   },
//   {
//     reactStrictMode: true,
//     webpack(config, options) {
//       const { webpack } = options;
//       config.module.rules.push({
//         test: /_app.js/,
//         loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
//       });
//       if (isServer) {
//         // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
//         Object.assign(config.resolve.alias, {});
//       } else {
//         config.output.publicPath = 'auto';
//         config.plugins.push(
//           new webpack.container.ModuleFederationPlugin({
//             remoteType: 'var',
//             shared: {
//               '@module-federation/nextjs-mf/lib/noop': {
//                 eager: false,
//               },
//               react: {
//                 singleton: true,
//                 eager: true,
//                 requiredVersion: false,
//               },
//             },
//           }),
//         );
//       }

//       config.output.publicPath = 'http://localhost:4010';
//       console.log('config : ', config);
//       return config;
//     },
//   },
// );

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    const { webpack, isServer } = options;
    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });
    if (isServer) {
      // ignore it on SSR, realistically you probably wont be SSRing Fmodules, without paid support from @ScriptedAlchemy
      Object.assign(config.resolve.alias, {});
    } else {
      // config.output.publicPath = 'auto';
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          name: 'remote1',
          library: { type: 'var', name: 'remote1' },
          filename: 'static/runtime/remoteEntry.js',
          exposes: {
            './Remote1': './components/Remote1',
            './Remote11': './components/Remote11',
          },
          shared: {
            react: {
              // Notice shared are NOT eager here.
              requiredVersion: false,
              singleton: true,
            },
          },
        }),
      );
    }

    config.output.publicPath = 'https://localhost:4010/_next/';
    console.log('config : ', config.output);
    return config;
  },
};
