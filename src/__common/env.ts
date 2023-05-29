// env.ts
export default () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpired: process.env.JWT_ACCESS_EXPIRED,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpired: process.env.JWT_REFRESH_EXPIRED,
  },
});
