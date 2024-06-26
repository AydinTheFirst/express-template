const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,

  /** Rate Limit */
  rateLimit: process.env.RATE_LIMIT || 100,
  rateLimitTime: process.env.RATE_LIMIT_TIME || 60,
};

export default config;
