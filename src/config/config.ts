export const config = {
  app: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  db: {
    url: process.env.DATABASE_URL || '',
  },
};
