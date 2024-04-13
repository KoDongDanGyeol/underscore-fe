/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
        source: "/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
      {
        source: "/map/search-location",
        has: [
          { type: "query", key: "location", value: "(?<location>.*)" },
          { type: "query", key: "page", value: "(?<page>.*)" },
        ],
        destination: `${process.env.NEXT_PUBLIC_API_KAKAO_URL}/v2/local/search/address.json?query=:location&page=:page&analyze_type=exact`,
      },
    ]
  },
}

module.exports = nextConfig
