export default () => ({
  database: {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: Boolean(process.env.DB_SYNCHRONIZE === 'true'),
    autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES),
  },
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
});
