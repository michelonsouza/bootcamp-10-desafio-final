require('dotenv/config');

module.exports = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
