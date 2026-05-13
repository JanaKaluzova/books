import type { Core } from '@strapi/strapi';

const config = (_: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      playgroundAlways: true,
    },
  },
});

export default config;
