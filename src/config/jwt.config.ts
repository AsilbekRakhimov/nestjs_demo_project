export default () => ({
  jwt: {
    jwtAccessKey: process.env.JWT_ACCESS_SECRET_KEY,
    jwtExpire: process.env.JWT_ACCESS_EXPIRES,
    jwtRefreshKey: process.env.JWT_REFRESH_SECRET_KEY,
    jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRES,
  },
});
