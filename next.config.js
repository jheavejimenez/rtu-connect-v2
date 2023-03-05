/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIRE_BASE_API_KEY: process.env.FIRE_BASE_API_KEY,
    FIRE_BASE_AUTH_DOMAIN: process.env.FIRE_BASE_AUTH_DOMAIN,
    FIRE_BASE_PROJECT_ID: process.env.FIRE_BASE_PROJECT_ID,
    FIRE_BASE_STORAGE_BUCKET: process.env.FIRE_BASE_STORAGE_BUCKET,
    FIRE_BASE_MESSAGING_SENDER_ID: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
    FIRE_BASE_APP_ID: process.env.FIRE_BASE_APP_ID,
    FIRE_BASE_MEASUREMENT_ID: process.env.FIRE_BASE_MEASUREMENT_ID
  }
};

module.exports = nextConfig;
