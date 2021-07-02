module.exports  = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret!"
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "R666Qq48RA",
    password: process.env.MYSQL_PASS || "akyjiTOxIR",
    database: process.env.MYSQL_DB || "R666Qq48RA",
  }
}
