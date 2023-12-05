/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
        // ENVIRONMENT: process.env.ENVIRONMENT,
        // MUI_LICENSE_KEY: process.env.MUI_LICENSE_KEY,
        URL_IMG: "https://ancona.s3.us-east-2.amazonaws.com/",
        URL_API: process.env.URL_SERVER_API,
        URL_APIDEV: process.env.URL_API_DEV,
        // URL_SERVER_FILES: process.env.URL_SERVER_FILES,
        // URL_ZOHO: process.env.URL_ZOHO,
        // MIENVIO_URL: process.env.MIENVIO_URL,
        // MIENVIO_TOKEN: process.env.MIENVIO_TOKEN
    },
    images: {
      domains: ['ancona.s3.us-east-2.amazonaws.com', 's3-demo-dv.s3.amazonaws.com'], // Agrega el nombre del host aquí
    }
}

module.exports = nextConfig
