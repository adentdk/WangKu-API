// env.ts
export default () => ({
  port: parseInt(process.env.PORT, 10),
  auth: {
    basicUserId: process.env.AUTH_BASIC_USER_ID,
    basicUsername: process.env.AUTH_BASIC_USERNAME,
    basicPassword: process.env.AUTH_BASIC_PASSWORD,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpired: process.env.JWT_ACCESS_EXPIRED,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpired: process.env.JWT_REFRESH_EXPIRED,
  },
  cache: {
    ttl: process.env.REDIS_CACHE_TTL,
    url: process.env.REDIS_CACHE_URL,
  },
});
