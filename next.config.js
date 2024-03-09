const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { merge } = require("webpack-merge");

const PORTAL_SHARED_COMPONENTS_URL =
  process.env.NEXT_PUBLIC_PORTAL_SHARED_COMPONENTS_URL ??
  "http://localhost:3000";

const remotes = (isServer, PORTAL_SHARED_COMPONENTS_URL) => {
  const location = isServer ? "ssr" : "chunks";

  return {
    "portal-shared-components": `portal-shared-components@${PORTAL_SHARED_COMPONENTS_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  webpack: (config, options) => {
    // config.plugins.push(
    //   new NextFederationPlugin({
    //     extraOptions: {},
    //     filename: "static/chunks/remoteEntry.js",
    //     name: "template",
    //     remotes: remotes(options.isServer, PORTAL_SHARED_COMPONENTS_URL),
    //     exposes: {
    //       "./page": "./pages/index.tsx",
    //     },
    //     shared: {},
    //   })
    // );

    return merge(config, {
      entry() {
        return config.entry().then((entry) => {
          return Object.assign({}, entry, {
            "static/hello.js": "./components/index.tsx",
          });
        });
      },
    });

    // return {
    //   ...config,
    //   entry: async () => {
    //     const entryConfig = await config.entry();
    //     return { ...entryConfig, "static/hello.js": "./components/index.tsx" };
    //   },
    // };
  },
};

module.exports = nextConfig;
