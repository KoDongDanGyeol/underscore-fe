/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_CONFIG_OUTPUT,
  experimental: {
    instrumentationHook: true,
  },
  webpack(config, { isServer }) {
    if (isServer) {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/browser", alias: false })
      } else {
        config.resolve.alias["msw/browser"] = false
      }
    } else {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: "msw/node", alias: false })
      } else {
        config.resolve.alias["msw/node"] = false
      }
    }
    return config
  },
  compiler: {
    styledComponents: {
      ssr: true,
      pure: true,
    },
  },
  async rewrites() {
    return [
      {
        source: "/map/search-location/:params*",
        destination: `${process.env.NEXT_PUBLIC_API_KAKAO_URL}/v2/local/search/address.json/:params*`,
      },
      {
        source: "/map/search-category/:params*",
        destination: `${process.env.NEXT_PUBLIC_API_KAKAO_URL}/v2/local/search/category.json/:params*`,
      },
    ]
  },
}

module.exports = nextConfig
