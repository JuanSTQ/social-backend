module.exports  = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret"
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "R666Qq48RA",
    password: process.env.MYSQL_PASS || "akyjiTOxIR",
    database: process.env.MYSQL_DB || "R666Qq48RA",
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  post: {
    host: process.env.POST_HOST || 'localhost',
    port: process.env.POST_PORT || 3002,
  }
}
