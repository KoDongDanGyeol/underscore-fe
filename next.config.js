/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: {
      ssr: true,
      pure: true,
    },
  },
}

module.exports = nextConfig
