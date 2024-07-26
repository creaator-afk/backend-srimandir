const CONFIG = {
    ORIGIN: process.env.CORS_ORIGIN,
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URI || "mongodb://localhost:27017/srimandir",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

module.exports = CONFIG;
