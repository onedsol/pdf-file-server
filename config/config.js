const host = 'localhost';
const hostDB = 'localhost';
const port = 3000;
const basePath = '/home/hermeslm/dev/sources/pdf-file-server/public';


const config = {
  server: {
    host: host,
    port: port
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

