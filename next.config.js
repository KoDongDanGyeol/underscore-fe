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
        destination: `${process.env.NEXT_PUBLIC_API_KAKAO_URL}/v2/local/search/address.json?analyze_type=exact&query=:location&page=:page`,
      },
      {
        source: "/map/search-category",
        has: [
          { type: "query", key: "categoryCode", value: "(?<categoryCode>.*)" },
          { type: "query", key: "rect", value: "(?<rect>.*)" },
          { type: "query", key: "page", value: "(?<page>.*)" },
          { type: "query", key: "size", value: "(?<size>.*)" },
        ],
        destination: `${process.env.NEXT_PUBLIC_API_KAKAO_URL}/v2/local/search/category.json?category_group_code=:categoryCode&rect=:rect&page=:page&size=:size`,
      },
    ]
  },
}

module.exports = nextConfig
