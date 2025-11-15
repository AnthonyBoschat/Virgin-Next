import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  sassOptions: {
    api: 'modern',
    loadPaths: ['styles'],
    additionalData: `
      @use "abstracts/variables" as v;
      @use "abstracts/mixins" as m;
      @use "abstracts/functions" as f;
      @use "abstracts/animations" as a;
    `,
  },
};

export default nextConfig;