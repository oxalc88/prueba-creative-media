const config = {
  PORT: process.env.PORT || 3001,
  database_name: process.env.DATABASE_NAME,
  database_pass: process.env.DATABASE_PASS,
  database_cluster: process.env.DATABASE_CLUSTER,
};

module.exports = config;
