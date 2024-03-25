const host = 'localhost';
const hostDB = 'localhost';
const port = 3000;
const sslPort = 443;
// const basePath = '/home/hermeslm/dev/sources/pdf-file-server/public'; // Path for Linux
const basePath = '/Users/hermeslm/dev/sources/pdf-file-server/public'; // Path for Mac
// const basePath = 'c:/dev/access/sunshine/docs';  // Path for Windows


const config = {
  server: {
    host: host,
    port: port,
    sslPort: sslPort
  },
  files: {
    basePath: basePath
  },
  database: {
    host: hostDB,
    url: `mongodb://${hostDB}/node-express-skeleton-dev`,
    properties: {
      useMongoClient: true
    }
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpireInSeconds: 1440
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 10
  }
};

export default config;

